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
  const adminBtn = `<a href="#admin" class="btn-topbar-admin" title="Vào trang quản trị">📊 Quản trị</a>`;

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
function getWeatherIconSvg(code) {
  if (code === 0) {
    // Trời nắng ráo
    return `<svg class="weatherSvg" width="68" height="68" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="sunFullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE082" />
          <stop offset="50%" stop-color="#FFB300" />
          <stop offset="100%" stop-color="#F57C00" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="14" fill="url(#sunFullGrad)" filter="drop-shadow(0 0 8px rgba(255,179,0,0.6))"/>
      <g stroke="#FFA000" stroke-width="2.8" stroke-linecap="round">
        <line x1="32" y1="7" x2="32" y2="12" />
        <line x1="32" y1="52" x2="32" y2="57" />
        <line x1="7" y1="32" x2="12" y2="32" />
        <line x1="52" y1="32" x2="57" y2="32" />
        <line x1="14.3" y1="14.3" x2="17.8" y2="17.8" />
        <line x1="46.2" y1="46.2" x2="49.7" y2="49.7" />
        <line x1="14.3" y1="49.7" x2="17.8" y2="46.2" />
        <line x1="46.2" y1="17.8" x2="49.7" y2="14.3" />
      </g>
    </svg>`;
  } else if (code >= 51 && code <= 67) {
    // Có mưa nhỏ / mưa vừa
    return `<svg class="weatherSvg" width="68" height="68" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#CBD5E1" />
          <stop offset="100%" stop-color="#64748B" />
        </linearGradient>
      </defs>
      <path d="M46 36H20a10 10 0 0 1-2-19.8 13 13 0 0 1 25.3-3.8A10 10 0 0 1 46 36z" fill="url(#rainCloud)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"/>
      <g stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round">
        <line x1="22" y1="42" x2="19" y2="50" />
        <line x1="32" y1="42" x2="29" y2="50" />
        <line x1="42" y1="42" x2="39" y2="50" />
      </g>
    </svg>`;
  } else if (code >= 80) {
    // Mưa rào / giông bão
    return `<svg class="weatherSvg" width="68" height="68" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="thunderCloud" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#94A3B8" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>
      </defs>
      <path d="M46 34H20a10 10 0 0 1-2-19.8 13 13 0 0 1 25.3-3.8A10 10 0 0 1 46 34z" fill="url(#thunderCloud)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"/>
      <polygon points="31,32 25,43 31,43 28,54 38,41 33,41" fill="#FACC15" filter="drop-shadow(0 0 6px rgba(250,204,21,0.8))"/>
    </svg>`;
  } else {
    // Mặc định: Có mây rải rác / Nắng nhẹ
    return `<svg class="weatherSvg" width="68" height="68" viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FDB813" />
          <stop offset="100%" stop-color="#F57C00" />
        </linearGradient>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="100%" stop-color="#E2E8F0" />
        </linearGradient>
      </defs>
      <circle cx="26" cy="24" r="12" fill="url(#sunGrad)" filter="drop-shadow(0 0 6px rgba(253,184,19,0.5))"/>
      <g stroke="#FFA000" stroke-width="2.5" stroke-linecap="round">
        <line x1="26" y1="6" x2="26" y2="9" />
        <line x1="13" y1="13" x2="15" y2="15" />
        <line x1="8" y1="24" x2="11" y2="24" />
        <line x1="39" y1="13" x2="37" y2="15" />
      </g>
      <path d="M48 48H22a11 11 0 0 1-2.2-21.8 14 14 0 0 1 27.2-4.2A11 11 0 0 1 48 48z" fill="url(#cloudGrad)" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.25))"/>
    </svg>`;
  }
}

const WEATHER_LOC_KEY = 'citiship_weather_loc';

// Lấy thông tin thời tiết theo tọa độ (mặc định hoặc GPS)
async function fetchWeatherByCoords(lat, lon, locationName) {
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
    if (!res.ok) return;
    const data = await res.json();
    const currentTemp = Math.round(data.current.temperature_2m);
    const minTemp = Math.round(data.daily.temperature_2m_min[0]);
    const maxTemp = Math.round(data.daily.temperature_2m_max[0]);
    
    const cityEl = document.getElementById('weather-city');
    const tempEl = document.getElementById('weather-temp');
    const minEl = document.getElementById('weather-min');
    const maxEl = document.getElementById('weather-max');
    const descEl = document.getElementById('weather-desc');
    const iconWrap = document.getElementById('weather-icon-wrap');

    if (cityEl && locationName) cityEl.innerText = `📍 ${locationName.toUpperCase()}`;
    if (tempEl) tempEl.innerText = `${currentTemp}°`;
    if (minEl) minEl.innerText = `${minTemp}°`;
    if (maxEl) maxEl.innerText = `${maxTemp}°`;
    
    const code = data.current.weather_code;
    let desc = 'CÓ MÂY · ĐI CA TỐT';
    if (code === 0) desc = 'NẮNG RÁO · ĐI CA TỐT ☀️';
    else if (code <= 3) desc = 'CÓ MÂY RẢI RÁC ⛅';
    else if (code >= 51 && code <= 67) desc = 'CÓ MƯA NHỎ 🌧️';
    else if (code >= 80) desc = 'CÓ MƯA RÀO ⛈️';
    
    if (descEl) descEl.innerText = desc;
    if (iconWrap) iconWrap.innerHTML = getWeatherIconSvg(code);
  } catch (e) {
    // Giữ nguyên giá trị khi offline
  }
}

// Lấy tên địa danh (Quận/Huyện, Tỉnh/TP) từ tọa độ GPS qua BigDataCloud
async function getReverseGeocodeName(lat, lon) {
  try {
    const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`);
    if (!res.ok) return null;
    const data = await res.json();
    const locality = data.locality || data.district || '';
    const city = data.city || data.principalSubdivision || '';
    if (locality && city) {
      return locality.toLowerCase().includes(city.toLowerCase()) ? locality : `${locality}, ${city}`;
    }
    return locality || city || null;
  } catch (e) {
    return null;
  }
}

// Cập nhật thời tiết thông minh: Tự động lấy GPS nếu được cấp quyền hoặc dùng Ninh Kiều
function updateSmartWeather(requestGps = false) {
  let defaultLat = 10.03;
  let defaultLon = 105.78;
  let defaultName = 'NINH KIỀU, CẦN THƠ';

  // 1. Kiểm tra vị trí đã lưu trong máy
  const saved = localStorage.getItem(WEATHER_LOC_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.lat && parsed.lon) {
        defaultLat = parsed.lat;
        defaultLon = parsed.lon;
        defaultName = parsed.name || defaultName;
      }
    } catch(e) {}
  }

  // Tải trước dữ liệu với vị trí hiện tại
  fetchWeatherByCoords(defaultLat, defaultLon, defaultName);

  // 2. Kích hoạt GPS khi người dùng bấm hoặc chưa lưu vị trí
  if (navigator.geolocation && (requestGps || !saved)) {
    const cityEl = document.getElementById('weather-city');
    if (requestGps && cityEl) cityEl.innerText = '🛰️ ĐANG ĐỊNH VỊ GPS...';

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));
        const geoName = await getReverseGeocodeName(lat, lon);
        const finalName = geoName || 'VỊ TRÍ CỦA BẠN';
        localStorage.setItem(WEATHER_LOC_KEY, JSON.stringify({ lat, lon, name: finalName }));
        fetchWeatherByCoords(lat, lon, finalName);
      },
      (err) => {
        console.log('GPS không kích hoạt hoặc từ chối, dùng vị trí:', defaultName);
        fetchWeatherByCoords(defaultLat, defaultLon, defaultName);
      },
      { timeout: 8000, maximumAge: 300000 }
    );
  }
}

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
      <div class="home-hero-left">
        <div class="hero-badge">🛵 CITISHIP CẦN THƠ · CẨM NANG ĐỐI TÁC</div>
        <h1>${SITE.title}</h1>
        <p class="intro">${SITE.intro}</p>
        ${progressBanner}
      </div>
      <div class="home-hero-right">
        <!-- Widget Thời tiết thông minh theo vị trí -->
        <div class="weatherCardContainer" onclick="updateSmartWeather(true)" title="Chạm để định vị GPS theo vị trí của bạn">
          <div class="weatherCard">
            <p class="weatherCity" id="weather-city">📍 NINH KIỀU, CẦN THƠ</p>
            <p class="weatherStatus" id="weather-desc">ĐANG CẬP NHẬT...</p>
            <div id="weather-icon-wrap">
              ${getWeatherIconSvg(2)}
            </div>
            <p class="weatherTemp" id="weather-temp">--°</p>
            <div class="weatherMinmax">
              <div class="weatherMin">
                <p class="weatherMinHeading">Min</p>
                <p class="weatherMinTemp" id="weather-min">--°</p>
              </div>
              <div class="weatherMax">
                <p class="weatherMaxHeading">Max</p>
                <p class="weatherMaxTemp" id="weather-max">--°</p>
              </div>
            </div>
            <span class="weather-gps-hint">🎯 Chạm để định vị GPS</span>
          </div>
        </div>
      </div>
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
      <p>© 2026 Citiship Cần Thơ · Đồng hành cùng Đối tác tài xế</p>
      <div class="footer-links">
        <a href="https://t.me/citiship_cantho" target="_blank" rel="noopener">💬 Hỗ trợ Telegram</a>
        <span class="footer-dot">·</span>
        <a href="#admin" class="footer-admin-link">🔒 Quản trị hệ thống</a>
      </div>
    </footer>`;

  updateSmartWeather();
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

// Tự động cập nhật thời tiết liên tục (mỗi 15 phút)
setInterval(() => {
  const hash = location.hash.replace(/^#\/?/, '');
  if (!hash || hash === '') {
    updateSmartWeather();
  }
}, 15 * 60 * 1000);

// Cập nhật ngay khi người dùng chuyển lại tab làm việc
window.addEventListener('focus', () => {
  const hash = location.hash.replace(/^#\/?/, '');
  if (!hash || hash === '') {
    updateSmartWeather();
  }
});

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
