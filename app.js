// Supabase Configuration
const SUPABASE_URL = 'https://xftqqtoooojvgudhvjgg.supabase.co';
const SUPABASE_KEY = 'sb_publishable_43ximDxkHgLWrlQFFprJuA_NL9XRa5E';
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

// Quản lý User State trong LocalStorage
const USER_KEY = 'citiship_user';
const CONFIRM_KEY = 'citiship_confirmed_pages';
const ADMIN_PIN_KEY = 'citiship_admin_auth';
const DEFAULT_PIN = '07072002'; // Mã PIN quản trị

function getUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch (e) {
    return null;
  }
}

function setUser(user) {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getLocalConfirmed() {
  try {
    return JSON.parse(localStorage.getItem(CONFIRM_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function setLocalConfirmed(map) {
  localStorage.setItem(CONFIRM_KEY, JSON.stringify(map));
}

// Map pageId trong web sang tên cột trong Supabase
const PAGE_COL_MAP = {
  'chinh-sach': 'chinh_sach',
  'quy-dinh': 'quy_dinh',
  'trung-thuc': 'trung_thuc',
  'quy-trinh': 'quy_trinh',
  'huong-dan-app': 'huong_dan_app',
  'tai-khoan': 'tai_khoan',
  'lenh-telegram': 'lenh_telegram',
  'ho-tro': 'ho_tro'
};

const app = document.getElementById('app');
const loginModal = document.getElementById('login-modal');
const userInfoEl = document.getElementById('user-info');

// Quản lý Chế độ Giao diện Dark Mode / Light Mode
const THEME_KEY = 'citiship_theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}

function isDarkMode() {
  return document.body.classList.contains('dark-mode');
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  renderUserPill();
}

// Khởi chạy kiểm tra Dark Mode ngay
initTheme();

// Hiển thị pill thông tin user trên topbar
function renderUserPill() {
  const user = getUser();
  const themeBtn = `<button class="btn-theme-toggle" id="theme-toggle" title="Đổi chế độ Sáng / Tối" onclick="toggleTheme()">${isDarkMode() ? '☀️' : '🌙'}</button>`;
  const adminBtn = `<a href="#admin" class="btn-topbar-admin" title="Vào trang quản trị"><span class="admin-ico">📊</span><span class="admin-label">Quản trị</span></a>`;

  if (!user) {
    userInfoEl.innerHTML = `
      ${themeBtn}
      ${adminBtn}
      <button class="btn-login-pill" onclick="showLoginModal()">Đăng nhập</button>
    `;
    return;
  }

  const roleText = user.role === 'tongdai' ? 'Tổng đài' : 'Shipper';
  const roleClass = user.role === 'tongdai' ? 'role-td' : 'role-sp';
  userInfoEl.innerHTML = `
    ${themeBtn}
    ${adminBtn}
    <span class="pill-name">${user.name}</span>
    <span class="pill-role ${roleClass}">${roleText}</span>
    <button class="btn-logout" title="Đổi thông tin" onclick="logoutUser()">Đổi</button>
  `;
}

function logoutUser() {
  if (confirm('Bạn có muốn đổi thông tin người xem?')) {
    localStorage.removeItem(USER_KEY);
    showLoginModal();
    renderUserPill();
    renderHome();
  }
}

// Modal Đăng nhập / Nhập thông tin bắt buộc
function showLoginModal() {
  loginModal.style.display = 'flex';
  loginModal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <img src="images/citiship-logo.png" alt="Logo" class="modal-logo">
        <h2>Thông tin Người xem</h2>
        <p>Vui lòng nhập thông tin trước khi đọc nội quy & quy trình</p>
      </div>
      <form id="login-form" onsubmit="handleLoginSubmit(event)">
        <div class="form-group">
          <label>Vai trò của bạn:</label>
          <div class="role-selector">
            <label class="role-opt">
              <input type="radio" name="role" value="shipper" checked onchange="togglePhoneReq(true)">
              <span>🛵 Shipper (Đối tác)</span>
            </label>
            <label class="role-opt">
              <input type="radio" name="role" value="tongdai" onchange="togglePhoneReq(false)">
              <span>🎧 Tổng đài viên</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label for="user-name">Họ và Tên của bạn:</label>
          <input type="text" id="user-name" required placeholder="Ví dụ: Nguyễn Văn A" autocomplete="name">
        </div>

        <div class="form-group" id="phone-group">
          <label for="user-phone">Số điện thoại (dùng chạy app):</label>
          <input type="tel" id="user-phone" required placeholder="Ví dụ: 0912345678" pattern="[0-9]{9,11}" autocomplete="tel">
          <small class="form-hint">Số điện thoại dùng để lưu tiến độ xác nhận đọc quy định</small>
        </div>

        <button type="submit" class="btn-submit" id="btn-save-user">Bắt đầu đọc</button>
      </form>
    </div>
  `;
}

function togglePhoneReq(isShipper) {
  const phoneGroup = document.getElementById('phone-group');
  const phoneInput = document.getElementById('user-phone');
  if (isShipper) {
    phoneGroup.style.display = 'block';
    phoneInput.required = true;
  } else {
    phoneGroup.style.display = 'none';
    phoneInput.required = false;
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const role = document.querySelector('input[name="role"]:checked').value;
  const phone = role === 'shipper' ? document.getElementById('user-phone').value.trim() : '0000000000';

  if (!name) return alert('Vui lòng nhập Họ và Tên!');
  if (role === 'shipper' && (!phone || phone.length < 9)) {
    return alert('Vui lòng nhập số điện thoại hợp lệ!');
  }

  const btn = document.getElementById('btn-save-user');
  btn.disabled = true;
  btn.innerText = 'Đang lưu...';

  const user = { name, phone, role };
  setUser(user);

  // Nếu là Shipper, đồng bộ hoặc khởi tạo trên Supabase
  if (role === 'shipper' && supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('shipper_confirmations')
        .select('*')
        .eq('phone', phone)
        .maybeSingle();

      if (data) {
        // Đồng bộ các mục đã tick từ Supabase về máy
        const confirmed = {};
        for (const [pId, col] of Object.entries(PAGE_COL_MAP)) {
          if (data[col]) confirmed[pId] = true;
        }
        setLocalConfirmed(confirmed);
      } else {
        // Chưa có thì tạo dòng mới
        await supabaseClient.from('shipper_confirmations').insert([{
          phone: phone,
          name: name,
          role: 'shipper',
          progress: '0/8',
          status: 'Đang đọc (0/8)'
        }]);
      }
    } catch (err) {
      console.warn('Lỗi kết nối Supabase:', err);
    }
  }

  loginModal.style.display = 'none';
  renderUserPill();
  route();
}

// Bấm nút Xác nhận đã đọc & hiểu rõ
async function confirmPage(pageId) {
  const user = getUser();
  if (!user || user.role !== 'shipper') return;

  const btn = document.getElementById('btn-confirm-' + pageId);
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Đang ghi nhận...';
  }

  // 1. Lưu local
  const confirmed = getLocalConfirmed();
  confirmed[pageId] = true;
  setLocalConfirmed(confirmed);

  // 2. Đồng bộ lên Supabase
  if (supabaseClient) {
    try {
      const colName = PAGE_COL_MAP[pageId];
      const count = Object.keys(confirmed).length;
      const progressText = `${count}/8`;
      const statusText = count === 8 ? 'HOÀN THÀNH ✅' : `Đang đọc (${count}/8)`;

      const updateData = {
        name: user.name,
        role: 'shipper',
        progress: progressText,
        status: statusText,
        updated_at: new Date().toISOString()
      };
      if (colName) updateData[colName] = true;

      const { error } = await supabaseClient
        .from('shipper_confirmations')
        .upsert({
          phone: user.phone,
          ...updateData
        }, { onConflict: 'phone' });

      if (error) console.error('Supabase update error:', error);
    } catch (err) {
      console.warn('Không thể gửi lên Supabase:', err);
    }
  }

  alert('Đã ghi nhận bạn hiểu rõ quy định này! Cảm ơn bạn.');
  location.hash = '#/';
}

// Trang Quản Trị / Báo Cáo (#/admin)
async function renderAdmin() {
  document.title = 'Quản trị - Theo dõi xác nhận Shipper | Citiship';
  
  // Kiểm tra mã PIN quản trị
  const isAuth = sessionStorage.getItem(ADMIN_PIN_KEY);
  if (!isAuth) {
    app.innerHTML = `
      <div class="admin-auth-box">
        <div class="auth-icon-circle">🔒</div>
        <h2>Khu Vực Quản Trị</h2>
        <p class="auth-subtitle">Vui lòng nhập mã PIN quản lý để truy cập báo cáo xác nhận:</p>
        <form onsubmit="handleAdminAuth(event)">
          <div class="pin-input-wrap">
            <input type="password" id="admin-pin-input" placeholder="••••" maxlength="10" autofocus required>
          </div>
          <button type="submit" class="btn-admin-primary">Mở bảng dữ liệu →</button>
        </form>
        <a class="auth-back-link" href="#/">← Quay về trang chủ</a>
      </div>
    `;
    return;
  }

  app.innerHTML = `
    <div class="admin-header">
      <div class="admin-top-nav">
        <a class="admin-back-btn" href="#/">← Về trang chủ</a>
        <div class="admin-actions">
          <button class="btn-admin-action" onclick="loadAdminData()" title="Làm mới dữ liệu">🔄 Làm mới</button>
          <button class="btn-admin-action btn-export" onclick="exportToCSV()" title="Tải file Excel/CSV">📥 Xuất Excel</button>
          <button class="btn-admin-action btn-lock" onclick="logoutAdmin()" title="Khóa quản trị">🔒 Khóa PIN</button>
        </div>
      </div>

      <div class="admin-title-row">
        <div>
          <h1>📊 Bảng Điều Hành & Theo Dõi Shipper</h1>
          <p class="intro">Dữ liệu thời gian thực được đồng bộ trực tiếp từ hệ thống Supabase.</p>
        </div>
      </div>

      <!-- Khối thống kê KPI -->
      <div id="admin-stats-container"></div>
      
      <!-- Thanh công cụ tìm kiếm và bộ lọc -->
      <div class="admin-filter-bar">
        <div class="search-input-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" id="admin-search" placeholder="Tìm theo tên hoặc số điện thoại..." oninput="filterAdminTable()">
        </div>
        <div class="filter-select-wrap">
          <select id="admin-status-filter" onchange="filterAdminTable()">
            <option value="all">Tất cả trạng thái</option>
            <option value="done">Đã hoàn thành (8/8)</option>
            <option value="reading">Đang đọc dở (< 8/8)</option>
          </select>
        </div>
        <div class="admin-result-count" id="admin-result-count">Đang tải...</div>
      </div>
    </div>

    <div id="admin-table-container" class="admin-table-wrap">
      <div class="admin-loading-state">
        <div class="spinner"></div>
        <p>Đang tải dữ liệu từ Supabase...</p>
      </div>
    </div>
  `;

  loadAdminData();
}

function handleAdminAuth(e) {
  e.preventDefault();
  const inputPin = document.getElementById('admin-pin-input').value.trim();
  if (inputPin === DEFAULT_PIN) {
    sessionStorage.setItem(ADMIN_PIN_KEY, 'true');
    renderAdmin();
  } else {
    alert('Mã PIN không chính xác! Vui lòng thử lại.');
    const input = document.getElementById('admin-pin-input');
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

function logoutAdmin() {
  if (confirm('Bạn có muốn khóa trang quản trị không?')) {
    sessionStorage.removeItem(ADMIN_PIN_KEY);
    renderAdmin();
  }
}

let cachedAdminList = [];

function renderAdminStats(list) {
  const statsContainer = document.getElementById('admin-stats-container');
  if (!statsContainer) return;

  const total = list.length;
  const completed = list.filter(item => item.progress === '8/8' || (item.status && item.status.includes('HOÀN THÀNH'))).length;
  const reading = total - completed;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  statsContainer.innerHTML = `
    <div class="admin-stats-grid">
      <div class="stat-card">
        <div class="stat-icon-wrap stat-blue">👥</div>
        <div class="stat-content">
          <div class="stat-num">${total}</div>
          <div class="stat-lbl">Tổng Shipper</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-green">✅</div>
        <div class="stat-content">
          <div class="stat-num">${completed}</div>
          <div class="stat-lbl">Đã hoàn thành (8/8)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-orange">📖</div>
        <div class="stat-content">
          <div class="stat-num">${reading}</div>
          <div class="stat-lbl">Đang đọc dở</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-purple">📈</div>
        <div class="stat-content">
          <div class="stat-num">${percent}%</div>
          <div class="stat-lbl">Tỷ lệ hoàn tất</div>
        </div>
      </div>
    </div>
  `;
}

async function loadAdminData() {
  const container = document.getElementById('admin-table-container');
  if (!container) return;

  if (!supabaseClient) {
    container.innerHTML = `<div class="admin-empty-state"><p style="color: #ef4444;">Chưa cấu hình Supabase Client!</p></div>`;
    return;
  }

  try {
    const { data, error } = await supabaseClient
      .from('shipper_confirmations')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) throw error;

    cachedAdminList = data || [];
    renderAdminStats(cachedAdminList);
    filterAdminTable();
  } catch (err) {
    container.innerHTML = `<div class="admin-empty-state"><p style="color: #ef4444;">Lỗi tải dữ liệu: ${err.message}</p></div>`;
  }
}

function renderAdminTable(list) {
  const container = document.getElementById('admin-table-container');
  const countEl = document.getElementById('admin-result-count');
  if (countEl) {
    countEl.innerHTML = `Hiển thị: <b>${list.length}</b> / ${cachedAdminList.length} đối tác`;
  }
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="admin-empty-state">
        <div class="empty-icon">🔍</div>
        <p>Không tìm thấy shipper nào phù hợp với bộ lọc.</p>
      </div>
    `;
    return;
  }

  const rows = list.map((item, idx) => {
    const isCompleted = item.progress === '8/8' || (item.status && item.status.includes('HOÀN THÀNH'));
    const statusBadge = isCompleted 
      ? `<span class="badge-done"><span class="badge-dot"></span>Hoàn thành</span>` 
      : `<span class="badge-reading"><span class="badge-dot"></span>${item.status || item.progress || 'Đang đọc'}</span>`;

    const d = item.updated_at ? new Date(item.updated_at) : null;
    const timeStr = d ? `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} · ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}` : '-';

    const tick = (val) => val 
      ? `<span class="chk-cell chk-on" title="Đã xác nhận">✓</span>` 
      : `<span class="chk-cell chk-off" title="Chưa đọc">-</span>`;

    let countDone = 0;
    if (item.progress && item.progress.includes('/')) {
      countDone = parseInt(item.progress.split('/')[0], 10) || 0;
    } else {
      for (const col of Object.values(PAGE_COL_MAP)) {
        if (item[col]) countDone++;
      }
    }
    const percentDone = Math.round((countDone / 8) * 100);

    return `
      <tr>
        <td class="col-stt">${idx + 1}</td>
        <td class="col-name">
          <div class="shipper-name">${item.name}</div>
        </td>
        <td class="col-phone"><span class="phone-chip">${item.phone}</span></td>
        <td class="col-tick">${tick(item.chinh_sach)}</td>
        <td class="col-tick">${tick(item.quy_dinh)}</td>
        <td class="col-tick">${tick(item.trung_thuc)}</td>
        <td class="col-tick">${tick(item.quy_trinh)}</td>
        <td class="col-tick">${tick(item.huong_dan_app)}</td>
        <td class="col-tick">${tick(item.tai_khoan)}</td>
        <td class="col-tick">${tick(item.lenh_telegram)}</td>
        <td class="col-tick">${tick(item.ho_tro)}</td>
        <td class="col-progress">
          <div class="mini-progress-wrap" title="${countDone}/8 mục">
            <span class="mini-progress-txt">${countDone}/8</span>
            <div class="mini-progress-bar"><div class="mini-bar-fill ${countDone === 8 ? 'fill-full' : ''}" style="width: ${percentDone}%"></div></div>
          </div>
        </td>
        <td class="col-status">${statusBadge}</td>
        <td class="col-time">${timeStr}</td>
      </tr>
    `;
  }).join('');

  container.innerHTML = `
    <table class="admin-table">
      <thead>
        <tr>
          <th class="col-stt">STT</th>
          <th class="col-name">Họ và Tên</th>
          <th class="col-phone">Số điện thoại</th>
          <th class="col-tick" title="1. Chính sách, chiết khấu">1. Chính sách</th>
          <th class="col-tick" title="2. Quy định">2. Quy định</th>
          <th class="col-tick" title="3. Trung thực & thái độ">3. Thái độ</th>
          <th class="col-tick" title="4. Quy trình xử lý đơn">4. Quy trình</th>
          <th class="col-tick" title="5. Hướng dẫn thao tác app">5. HD App</th>
          <th class="col-tick" title="6. Tài khoản">6. Tài khoản</th>
          <th class="col-tick" title="7. Bảng lệnh">7. Bảng lệnh</th>
          <th class="col-tick" title="8. Hỗ trợ">8. Hỗ trợ</th>
          <th class="col-progress">Tiến độ</th>
          <th class="col-status">Trạng thái</th>
          <th class="col-time">Cập nhật</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function filterAdminTable() {
  const q = (document.getElementById('admin-search')?.value || '').toLowerCase().trim();
  const statusFilter = document.getElementById('admin-status-filter')?.value || 'all';

  const filtered = cachedAdminList.filter(item => {
    const matchQ = (item.name && item.name.toLowerCase().includes(q)) || (item.phone && item.phone.includes(q));
    const isCompleted = item.progress === '8/8' || (item.status && item.status.includes('HOÀN THÀNH'));
    
    let matchStatus = true;
    if (statusFilter === 'done') matchStatus = isCompleted;
    if (statusFilter === 'reading') matchStatus = !isCompleted;

    return matchQ && matchStatus;
  });

  renderAdminTable(filtered);
}

// Xuất file CSV mở được bằng Excel
function exportToCSV() {
  if (!cachedAdminList || cachedAdminList.length === 0) return alert('Không có dữ liệu để xuất!');
  
  let csv = '\uFEFF'; // BOM UTF-8 để Excel hiển thị đúng tiếng Việt
  csv += 'STT,Họ và Tên,Số điện thoại,Chính sách,Quy định,Trung thực,Quy trình,Thao tác app,Tài khoản,Bảng lệnh,Hỗ trợ,Tiến độ,Trạng thái,Thời gian cập nhật\n';

  cachedAdminList.forEach((item, idx) => {
    const t = (val) => val ? 'Đã hiểu' : 'Chưa';
    const row = [
      idx + 1,
      `"${item.name || ''}"`,
      `"${item.phone || ''}"`,
      t(item.chinh_sach),
      t(item.quy_dinh),
      t(item.trung_thuc),
      t(item.quy_trinh),
      t(item.huong_dan_app),
      t(item.tai_khoan),
      t(item.lenh_telegram),
      t(item.ho_tro),
      item.progress || '0/8',
      `"${item.status || ''}"`,
      `"${item.updated_at || ''}"`
    ];
    csv += row.join(',') + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `citiship_xac_nhan_noi_quy_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Helper tạo Vector SVG Shipper chạy xe hướng về phía trước (quay mặt sang phải)
function getShipperBikeSvg() {
  return `<svg class="bike-svg" viewBox="0 0 54 34" width="46" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Khói & luồng gió tốc độ phía sau đuôi xe -->
    <g class="bike-smoke" opacity="0.85">
      <path d="M2 19 H8 M-1 23 H6 M3 26 H7" stroke="#94a3b8" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="5" cy="23" r="1.5" fill="#cbd5e1" />
    </g>
    <!-- Bánh xe sau (Bên trái) -->
    <circle cx="12" cy="24" r="6.5" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <circle cx="12" cy="24" r="2.5" fill="#cbd5e1"/>
    <!-- Bánh xe trước (Bên phải - hướng chạy tới) -->
    <circle cx="40" cy="24" r="6.5" fill="#1e293b" stroke="#64748b" stroke-width="1.5"/>
    <circle cx="40" cy="24" r="2.5" fill="#cbd5e1"/>
    <!-- Khung sườn xe Citiship -->
    <path d="M12 24 L20 20 L31 20 L40 24" stroke="#0a3871" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M24 20 L28 13 L35 13" stroke="#f57c00" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Ghi-đông & Đèn pha chiếu sáng rọi về trước -->
    <path d="M32 13 L36 9" stroke="#334155" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M36 13 L41 14" stroke="#f57c00" stroke-width="3.2" stroke-linecap="round"/>
    <polygon points="42,13 52,9 52,19 42,16" fill="rgba(253, 224, 71, 0.5)"/>
    <!-- Thùng hàng shipper cam phía sau xe -->
    <rect x="8" y="10" width="12" height="11" rx="2.5" fill="#f57c00" stroke="#c2410c" stroke-width="1.2"/>
    <line x1="8" y1="15.5" x2="20" y2="15.5" stroke="#ffffff" stroke-width="1.5"/>
    <!-- Shipper cúi mình lái xe về phía trước -->
    <path d="M20 18 Q25 13 29 13" stroke="#0a3871" stroke-width="5.5" stroke-linecap="round"/>
    <path d="M25 15 L34 12" stroke="#0a3871" stroke-width="2.5" stroke-linecap="round"/>
    <!-- Nón bảo hiểm cam Citiship & kính chắn gió -->
    <circle cx="29" cy="8.5" r="4.8" fill="#ea580c"/>
    <path d="M30.5 7 Q34 8 33 10.5" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
  </svg>`;
}

// Helper tạo SVG thời tiết vector sắc nét, chuẩn không vỡ hạt
// Render Trang chủ
function renderHome() {
  const user = getUser();
  if (!user) {
    showLoginModal();
    return;
  }

  document.title = SITE.title;
  const confirmed = getLocalConfirmed();
  const confirmedCount = Object.keys(confirmed).length;

  let progressBanner = '';
  if (user.role === 'shipper') {
    progressBanner = `
      <div class="user-progress-box">
        <div class="up-text">
          <span>Tiến độ đọc của <b>${user.name}</b>:</span>
          <b>${confirmedCount} / 8 mục đã xác nhận</b>
        </div>
        <div class="progress"><div class="bar" style="width:${(confirmedCount / 8) * 100}%"></div></div>
      </div>
    `;
  }

  app.innerHTML = `
    <div class="home-hero-wrap">
      <div class="hero-badge">🛵 CITISHIP CẦN THƠ · CẨM NANG ĐỐI TÁC</div>
      <h1>${SITE.title}</h1>
      <p class="intro">${SITE.intro}</p>
      ${progressBanner}
    </div>
    <div class="grid">
      ${PAGES.map(p => {
        const isDone = user.role === 'shipper' && confirmed[p.id];
        return `
          <a class="card ${isDone ? 'card-done' : ''}" href="#/${p.id}">
            <span class="ico ${p.tone}">${p.icon}</span>
            <span class="card-title">${p.title}</span>
            <span class="card-summary">${p.summary || ''}</span>
            ${isDone ? '<span class="done-badge">✓ Đã hiểu</span>' : ''}
          </a>
        `;
      }).join('')}
    </div>
    <footer class="site-footer">
      <div class="footer-notice">
        ⚖️ <b>Lưu ý nội bộ:</b> Tài liệu lưu hành nội bộ của Công ty Citiship. Mọi chính sách chiết khấu, quy trình đi đơn và chế tài xử lý vi phạm do Ban Điều hành Citiship phê duyệt và có hiệu lực thi hành đối với tất cả Đối tác tài xế.
      </div>
      <p>© 2026 Citiship Cần Thơ · Đồng hành cùng Đối tác tài xế</p>
      <div class="footer-links">
        <a href="https://t.me/citiship_cantho" target="_blank" rel="noopener">💬 Hỗ trợ Telegram</a>
        <span class="footer-dot">·</span>
        <a href="#admin" class="footer-admin-link">🔒 Quản trị hệ thống</a>
      </div>
    </footer>`;
}

// Trang đọc từng bước
function renderSteps(page, n) {
  const user = getUser();
  if (!user) return showLoginModal();

  const total = page.steps.length;
  const i = Math.min(Math.max(n, 1), total);
  const step = page.steps[i - 1];

  const prev = i > 1
    ? `<a class="btn" href="#/${page.id}/${i - 1}">← Trước</a>`
    : `<span></span>`;

  let next = '';
  const confirmed = getLocalConfirmed();
  const isDone = confirmed[page.id];

  if (i < total) {
    next = `<a class="btn primary" href="#/${page.id}/${i + 1}">Tiếp →</a>`;
  } else {
    // Bước cuối cùng: Nếu là Shipper thì hiện nút Xác nhận đã đọc
    if (user.role === 'shipper') {
      if (isDone) {
        next = `<a class="btn confirmed-done" href="#/">✓ Đã xác nhận mục này</a>`;
      } else {
        next = `<button class="btn confirm-btn" id="btn-confirm-${page.id}" onclick="confirmPage('${page.id}')">✓ Tôi đã đọc và hiểu rõ</button>`;
      }
    } else {
      next = `<a class="btn primary" href="#/">Xong ✓</a>`;
    }
  }

  const percent = (i / total) * 100;
  const isFinalStep = i === total;

  app.innerHTML = `
    <a class="back" href="#/">← Quay lại</a>
    <h1>${page.title}</h1>
    <div class="progress-road">
      <div class="progress-track">
        <div class="bar" style="width:${percent}%">
          <span class="bike-rider ${isFinalStep ? 'bike-finish' : ''}" title="Shipper Citiship tiến về đích">
            ${getShipperBikeSvg()}
          </span>
        </div>
        <span class="flag-finish ${isFinalStep ? 'flag-reached' : ''}" title="Đích đến">🏁</span>
      </div>
    </div>
    <p class="count">Ý ${i} / ${total}</p>
    <div class="content">
      <h2 class="step-title">${step.title}</h2>
      ${step.html}
    </div>
    <div class="nav">${prev}${next}</div>`;
}

function renderPage(id, n) {
  const user = getUser();
  if (!user) return showLoginModal();

  const page = PAGES.find(p => p.id === id);
  if (!page) return renderHome();
  document.title = `${page.title} - Citiship`;
  if (page.steps) {
    renderSteps(page, n);
  } else {
    app.innerHTML = `<a class="back" href="#/">← Quay lại</a><h1>${page.title}</h1><div class="content">${page.html}</div>`;
  }
  window.scrollTo(0, 0);
}

function route() {
  const hash = location.hash.replace(/^#\/?/, '');
  
  // Tuyến đường Admin
  const isAdmin = hash.startsWith('admin');
  document.body.classList.toggle('page-admin', isAdmin);

  if (isAdmin) {
    renderAdmin();
    return;
  }

  const user = getUser();
  renderUserPill();
  if (!user) {
    showLoginModal();
    return;
  }
  const [id, n] = hash.split('/');
  id ? renderPage(id, parseInt(n, 10) || 1) : renderHome();
}

window.addEventListener('hashchange', route);
route();

// Tính năng Phóng to ảnh (Image Lightbox Zoom)
function initImageLightbox() {
  let overlay = document.getElementById('image-lightbox');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'image-lightbox';
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
      <div class="lightbox-content" onclick="event.stopPropagation()">
        <button class="lightbox-close" title="Đóng (Esc)">✕</button>
        <img class="lightbox-img" src="" alt="Zoom image">
        <div class="lightbox-caption"></div>
        <div class="lightbox-hint">Chạm vào ảnh hoặc ngoài màn hình để đóng</div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.lightbox-close');
    const closeLightbox = () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    overlay.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('click', closeLightbox);
    overlay.querySelector('.lightbox-img').addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Bắt sự kiện click vào bất kỳ ảnh nào trong phần nội dung
  document.addEventListener('click', (e) => {
    const img = e.target.closest('.content img');
    if (!img) return;

    const src = img.getAttribute('src');
    if (!src) return;

    const figcaption = img.closest('figure')?.querySelector('figcaption')?.textContent || img.alt || '';
    
    const lbImg = overlay.querySelector('.lightbox-img');
    const lbCaption = overlay.querySelector('.lightbox-caption');
    
    lbImg.src = src;
    lbCaption.textContent = figcaption;
    
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

// Khởi tạo tính năng phóng to ảnh
initImageLightbox();
