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

// Helper kiểm tra nhóm vai trò Shipper
function isShipperRole(role) {
  return role === 'shipper' || role === 'shipper_cu' || role === 'shipper_moi';
}

function getRoleInfo(role) {
  if (role === 'tongdai') {
    return { name: 'Tổng đài', cls: 'role-td' };
  }
  if (role === 'shipper_moi') {
    return { name: 'Shipper Mới', cls: 'role-sp-moi' };
  }
  return { name: 'Đang chạy', cls: 'role-sp' };
}

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

  const roleInfo = getRoleInfo(user.role);
  userInfoEl.innerHTML = `
    ${themeBtn}
    ${adminBtn}
    <span class="pill-name">${user.name}</span>
    <span class="pill-role ${roleInfo.cls}">${roleInfo.name}</span>
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

// Modal Đăng nhập / Nhập thông tin bắt buộc với 3 Role
function showLoginModal() {
  loginModal.style.display = 'flex';
  loginModal.innerHTML = `
    <div class="modal-box">
      <div class="modal-header">
        <img src="images/citiship-logo.png" alt="Logo" class="modal-logo">
        <h2>Thông tin Người xem</h2>
        <p>Vui lòng chọn đúng vai trò trước khi đọc nội quy & quy trình</p>
      </div>
      <form id="login-form" onsubmit="handleLoginSubmit(event)">
        <div class="form-group">
          <label>Vai trò của bạn:</label>
          <div class="role-selector role-selector-3">
            <label class="role-opt">
              <input type="radio" name="role" value="shipper_cu" checked onchange="togglePhoneReq(true)">
              <span>🚚 Shipper đang chạy</span>
            </label>
            <label class="role-opt">
              <input type="radio" name="role" value="shipper_moi" onchange="togglePhoneReq(true)">
              <span>🔰 Shipper mới / Thử việc</span>
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
          <small class="form-hint">Dùng để lưu tiến độ xác nhận đọc và bài kiểm tra sát hạch</small>
        </div>

        <button type="submit" class="btn-submit" id="btn-save-user">Bắt đầu ngay</button>
      </form>
    </div>
  `;
}

function togglePhoneReq(isShipper) {
  const phoneGroup = document.getElementById('phone-group');
  const phoneInput = document.getElementById('user-phone');
  if (phoneGroup && phoneInput) {
    if (isShipper) {
      phoneGroup.style.display = 'block';
      phoneInput.required = true;
    } else {
      phoneGroup.style.display = 'none';
      phoneInput.required = false;
    }
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('user-name').value.trim();
  const role = document.querySelector('input[name="role"]:checked').value;
  const isShip = isShipperRole(role);
  const phone = isShip ? document.getElementById('user-phone').value.trim() : '0000000000';

  if (!name) return alert('Vui lòng nhập Họ và Tên!');
  if (isShip && (!phone || phone.length < 9)) {
    return alert('Vui lòng nhập số điện thoại hợp lệ!');
  }

  const btn = document.getElementById('btn-save-user');
  btn.disabled = true;
  btn.innerText = 'Đang lưu...';

  const user = { name, phone, role };
  setUser(user);

  // Nếu là Shipper, đồng bộ hoặc khởi tạo trên Supabase
  if (isShip && supabaseClient) {
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

        // Đồng bộ điểm thi nếu đã có
        if (data.exam_score !== undefined && data.exam_score !== null) {
          user.exam_score = data.exam_score;
          user.exam_status = data.exam_status;
          setUser(user);
        }

        // Cập nhật lại role và họ tên mới nhất
        await supabaseClient.from('shipper_confirmations').update({
          name: name,
          role: role,
          updated_at: new Date().toISOString()
        }).eq('phone', phone);
      } else {
        // Chưa có thì tạo dòng mới
        const initStatus = role === 'shipper_moi' ? 'Shipper mới (Chưa thi)' : 'Đang đọc (0/8)';
        await supabaseClient.from('shipper_confirmations').insert([{
          phone: phone,
          name: name,
          role: role,
          progress: '0/8',
          status: initStatus
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
  if (!user || !isShipperRole(user.role)) return;

  const btn = document.getElementById('btn-confirm-' + pageId);
  if (btn) {
    btn.disabled = true;
    btn.innerText = 'Đang ghi nhận...';
  }

  // 1. Lưu local
  const confirmed = getLocalConfirmed();
  confirmed[pageId] = true;
  setLocalConfirmed(confirmed);

  const count = Object.keys(confirmed).length;
  const progressText = `${count}/8`;
  let statusText = `Đang đọc (${count}/8)`;

  if (count === 8) {
    if (user.role === 'shipper_moi') {
      statusText = user.exam_status === 'passed' ? `ĐẬU SÁT HẠCH (${user.exam_score}/22)` : 'Đã đọc 8/8 (Chờ thi)';
    } else {
      statusText = 'HOÀN THÀNH ✅';
    }
  }

  // 2. Đồng bộ lên Supabase
  if (supabaseClient) {
    try {
      const colName = PAGE_COL_MAP[pageId];
      const updateData = {
        name: user.name,
        role: user.role,
        progress: progressText,
        status: statusText,
        updated_at: new Date().toISOString()
      };
      if (colName) updateData[colName] = true;

      await supabaseClient
        .from('shipper_confirmations')
        .upsert({
          phone: user.phone,
          ...updateData
        }, { onConflict: 'phone' });
    } catch (err) {
      console.warn('Không thể gửi lên Supabase:', err);
    }
  }

  if (user.role === 'shipper_moi' && count === 8) {
    alert('🎉 Chúc mừng bạn đã đọc và xác nhận đủ 8/8 mục nội quy!\nHệ thống sẽ mở khóa và chuyển bạn đến Bài Kiểm Tra Sát Hạch Kiến Thức (22 câu).');
    location.hash = '#/exam';
  } else {
    alert('Đã ghi nhận bạn hiểu rõ quy định này! Cảm ơn bạn.');
    location.hash = '#/';
  }
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
            <option value="all">Tất cả đối tác</option>
            <option value="done">Đã đọc đủ 8/8</option>
            <option value="reading">Đang đọc dở (< 8/8)</option>
            <option value="moi">🔰 Shipper Mới</option>
            <option value="cu">🚚 Shipper Đang chạy</option>
            <option value="exam_pass">🏆 Đã Đậu Sát Hạch</option>
            <option value="exam_pending">⚠️ Shipper Mới chưa đậu</option>
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
  const shipperMoiCount = list.filter(item => item.role === 'shipper_moi').length;
  const examPassedCount = list.filter(item => item.exam_status === 'passed' || (item.exam_score >= 19)).length;

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
          <div class="stat-lbl">Đã đọc đủ (8/8)</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-orange">🔰</div>
        <div class="stat-content">
          <div class="stat-num">${shipperMoiCount}</div>
          <div class="stat-lbl">Shipper Mới</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon-wrap stat-purple">🏆</div>
        <div class="stat-content">
          <div class="stat-num">${examPassedCount}</div>
          <div class="stat-lbl">Đã Đậu Sát Hạch</div>
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

    // Huy hiệu Vai trò
    const isMoi = item.role === 'shipper_moi';
    const roleBadge = isMoi 
      ? `<span class="badge-role-moi">🔰 Shipper Mới</span>` 
      : `<span class="badge-role-cu">🚚 Đang chạy</span>`;

    // Huy hiệu Điểm thi Sát hạch
    let examBadge = '';
    if (isMoi) {
      if (item.exam_score !== undefined && item.exam_score !== null) {
        const isPass = item.exam_status === 'passed' || item.exam_score >= 19;
        examBadge = isPass 
          ? `<span class="badge-exam-pass" title="Đạt chuẩn (≥19/22)">ĐẬU (${item.exam_score}/22)</span>`
          : `<span class="badge-exam-fail" title="Chưa đạt chuẩn (<19/22)">RỚT (${item.exam_score}/22)</span>`;
      } else {
        examBadge = `<span class="badge-exam-none">Chưa thi</span>`;
      }
    } else {
      examBadge = `<span class="badge-exam-na" title="Shipper cũ miễn thi">Miễn thi</span>`;
    }

    return `
      <tr>
        <td class="col-stt">${idx + 1}</td>
        <td class="col-name">
          <div class="shipper-name">${item.name}</div>
        </td>
        <td class="col-phone"><span class="phone-chip">${item.phone}</span></td>
        <td class="col-role">${roleBadge}</td>
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
        <td class="col-exam">${examBadge}</td>
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
          <th class="col-role">Vai trò</th>
          <th class="col-tick" title="1. Chính sách, chiết khấu">1. CS</th>
          <th class="col-tick" title="2. Quy định">2. QĐ</th>
          <th class="col-tick" title="3. Trung thực & thái độ">3. TĐ</th>
          <th class="col-tick" title="4. Quy trình xử lý đơn">4. QT</th>
          <th class="col-tick" title="5. Hướng dẫn thao tác app">5. HD</th>
          <th class="col-tick" title="6. Tài khoản">6. TK</th>
          <th class="col-tick" title="7. Bảng lệnh">7. BL</th>
          <th class="col-tick" title="8. Hỗ trợ">8. HT</th>
          <th class="col-progress">Đã đọc</th>
          <th class="col-exam">Sát hạch</th>
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
    const isMoi = item.role === 'shipper_moi';
    const isPassed = item.exam_status === 'passed' || item.exam_score >= 19;

    let matchStatus = true;
    if (statusFilter === 'done') matchStatus = isCompleted;
    if (statusFilter === 'reading') matchStatus = !isCompleted;
    if (statusFilter === 'moi') matchStatus = isMoi;
    if (statusFilter === 'cu') matchStatus = !isMoi;
    if (statusFilter === 'exam_pass') matchStatus = isPassed;
    if (statusFilter === 'exam_pending') matchStatus = isMoi && !isPassed;

    return matchQ && matchStatus;
  });

  renderAdminTable(filtered);
}

// Xuất file CSV mở được bằng Excel
function exportToCSV() {
  if (!cachedAdminList || cachedAdminList.length === 0) return alert('Không có dữ liệu để xuất!');
  
  let csv = '\uFEFF'; // BOM UTF-8 để Excel hiển thị đúng tiếng Việt
  csv += 'STT,Họ và Tên,Số điện thoại,Vai trò,Chính sách,Quy định,Trung thực,Quy trình,Thao tác app,Tài khoản,Bảng lệnh,Hỗ trợ,Tiến độ đọc,Điểm sát hạch,Trạng thái tổng,Thời gian cập nhật\n';

  cachedAdminList.forEach((item, idx) => {
    const t = (val) => val ? 'Đã hiểu' : 'Chưa';
    const roleTxt = item.role === 'shipper_moi' ? 'Shipper Mới' : 'Shipper Đang chạy';
    let examTxt = 'Miễn thi';
    if (item.role === 'shipper_moi') {
      if (item.exam_score !== undefined && item.exam_score !== null) {
        examTxt = `${item.exam_score}/22 (${item.exam_status === 'passed' || item.exam_score >= 19 ? 'ĐẬU' : 'RỚT'})`;
      } else {
        examTxt = 'Chưa thi';
      }
    }

    const row = [
      idx + 1,
      `"${item.name || ''}"`,
      `"${item.phone || ''}"`,
      `"${roleTxt}"`,
      t(item.chinh_sach),
      t(item.quy_dinh),
      t(item.trung_thuc),
      t(item.quy_trinh),
      t(item.huong_dan_app),
      t(item.tai_khoan),
      t(item.lenh_telegram),
      t(item.ho_tro),
      item.progress || '0/8',
      `"${examTxt}"`,
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
  const isShip = isShipperRole(user.role);

  let progressBanner = '';
  if (isShip) {
    if (user.role === 'shipper_moi') {
      const hasPassed = user.exam_status === 'passed' || (user.exam_score >= 19);
      const hasTaken = user.exam_score !== undefined && user.exam_score !== null;

      let examActionCard = '';
      if (confirmedCount < 8) {
        examActionCard = `
          <div class="new-shipper-card locked">
            <div class="nsc-icon">🔒</div>
            <div class="nsc-content">
              <h4>Lộ trình Sát hạch Shipper Mới:</h4>
              <p>Bạn cần đọc và bấm xác nhận đủ <b>8/8 mục</b> bên dưới để mở khóa <b>Bài Kiểm Tra Sát Hạch Kiến Thức (22 câu)</b>.</p>
              <div class="nsc-badge">Đã hoàn thành: <b>${confirmedCount} / 8 mục</b></div>
            </div>
          </div>
        `;
      } else if (hasPassed) {
        examActionCard = `
          <div class="new-shipper-card passed">
            <div class="nsc-icon">🏆</div>
            <div class="nsc-content">
              <h4>Chúc mừng! Bạn đã ĐẠT bài thi sát hạch Citiship!</h4>
              <p>Điểm số sát hạch: <b>${user.exam_score} / 22 câu (Đạt chuẩn ≥ 19/22)</b>. Dữ liệu đã được lưu trên hệ thống để cấp phép vào ca hoạt động.</p>
              <div class="nsc-actions">
                <a href="#/exam-result" class="btn-exam-outline">📄 Xem lại kết quả thi</a>
                <a href="#/exam" class="btn-exam-outline">🔄 Làm lại bài thi</a>
              </div>
            </div>
          </div>
        `;
      } else {
        // Đã đọc 8/8 nhưng chưa thi hoặc rớt
        examActionCard = `
          <div class="new-shipper-card unlocked-pulse">
            <div class="nsc-icon">🎉</div>
            <div class="nsc-content">
              <h4>Đã đọc trọn vẹn 8/8 mục! Bước tiếp theo:</h4>
              <p>Vui lòng hoàn thành <b>Bài Kiểm Tra Sát Hạch Kiến Thức (22 câu tình huống)</b> để kiểm tra mức độ hiểu quy trình.</p>
              ${hasTaken ? `<p class="exam-prev-score">Điểm lần trước: <span class="score-fail">${user.exam_score} / 22 câu (Chưa đạt)</span>. Yêu cầu: Đúng ≥ 19/22 câu.</p>` : ''}
              <a href="#/exam" class="btn-start-exam">✍️ VÀO PHÒNG THI SÁT HẠCH NGAY (22 CÂU) →</a>
            </div>
          </div>
        `;
      }

      progressBanner = `
        <div class="user-progress-box">
          <div class="up-text">
            <span>Tiến độ đọc của <b>${user.name}</b> (Shipper Mới):</span>
            <b>${confirmedCount} / 8 mục đã xác nhận</b>
          </div>
          <div class="progress"><div class="bar" style="width:${(confirmedCount / 8) * 100}%"></div></div>
        </div>
        ${examActionCard}
      `;
    } else {
      // Shipper đang chạy
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
        const isDone = isShip && confirmed[p.id];
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

// State lưu câu trả lời bài thi tạm thời
let currentExamAnswers = {};

// Giao diện Phòng thi Sát hạch (#/exam)
function renderExam() {
  const user = getUser();
  if (!user) {
    showLoginModal();
    return;
  }

  document.title = 'Phòng thi Sát hạch Kiến thức - Citiship';
  const confirmed = getLocalConfirmed();
  const confirmedCount = Object.keys(confirmed).length;

  // Nếu chưa đọc đủ 8 mục: Không cho làm bài
  if (confirmedCount < 8) {
    document.body.classList.remove('in-exam-mode');
    app.innerHTML = `
      <div class="exam-blocked-box">
        <div class="eb-icon">⛔</div>
        <h2>Chưa thể vào phòng thi</h2>
        <p>Bạn cần đọc và bấm xác nhận đủ <b>8/8 mục nội quy</b> trước khi tham gia bài sát hạch kiến thức.</p>
        <div class="eb-progress">
          <span>Tiến độ hiện tại của bạn:</span>
          <b>${confirmedCount} / 8 mục đã đọc</b>
        </div>
        <div class="eb-actions">
          <a href="#/" class="btn-admin-primary">← Quay lại đọc tiếp tài liệu</a>
        </div>
      </div>
    `;
    return;
  }

  // Khóa phòng thi: ẩn topbar navigation
  document.body.classList.add('in-exam-mode');

  // Khôi phục câu trả lời cũ nếu có
  if (user.exam_answers && Object.keys(currentExamAnswers).length === 0) {
    currentExamAnswers = { ...user.exam_answers };
  }

  const answeredCount = Object.keys(currentExamAnswers).length;

  const questionsHtml = EXAM_QUESTIONS.map((q, idx) => {
    const selected = currentExamAnswers[q.id];
    return `
      <div class="exam-qcard" id="qcard-${q.id}">
        <div class="qcard-header">
          <span class="qcard-num">Câu ${idx + 1} / 22</span>
          <span class="qcard-cat">${q.category}</span>
        </div>
        <div class="qcard-title">${q.question}</div>
        <div class="qcard-options">
          ${q.options.map((opt, oIdx) => {
            const isChecked = selected === oIdx;
            return `
              <label class="opt-label ${isChecked ? 'opt-checked' : ''}" id="opt-label-${q.id}-${oIdx}">
                <input type="radio" name="q_${q.id}" value="${oIdx}" ${isChecked ? 'checked' : ''} onchange="handleExamSelect(${q.id}, ${oIdx})">
                <span class="opt-indicator"></span>
                <span class="opt-text">${opt}</span>
              </label>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');

  app.innerHTML = `
    <div class="exam-page-container">
      <div class="exam-topbar">
        <div class="exam-brand-row">
          <span class="exam-badge-tag">🔒 PHÒNG THI SÁT HẠCH</span>
          <span class="exam-user-tag">Tài xế: <b>${user.name}</b> (${user.phone})</span>
        </div>
        <div class="exam-counter-pill">
          <span>Tiến độ làm bài:</span>
          <b id="exam-counter-txt">${answeredCount} / 22 câu</b>
        </div>
      </div>

      <div class="exam-intro-card">
        <h2>📝 BÀI KIỂM TRA SÁT HẠCH KIẾN THỨC SHIPPER MỚI</h2>
        <p>Đề thi gồm <b>22 câu hỏi tình huống thực tế</b> bám sát 8 mục quy trình hoạt động của Citiship.</p>
        <div class="exam-rules-note">
          <div class="ern-item">🚫 <b>Chế độ làm bài:</b> Không rời khỏi trang này trong lúc làm bài.</div>
          <div class="ern-item">🎯 <b>Tiêu chuẩn ĐẠT:</b> Đúng từ <b>19 / 22 câu</b> trở lên (≥ 85%).</div>
        </div>
      </div>

      <form id="exam-form" onsubmit="handleExamSubmit(event)">
        <div class="exam-questions-list">
          ${questionsHtml}
        </div>

        <div class="exam-submit-bar">
          <div class="exam-submit-info">
            Vui lòng kiểm tra kỹ tất cả các câu trước khi bấm nộp bài.
          </div>
          <button type="submit" class="btn-submit-exam" id="btn-submit-exam">
            NỘP BÀI THI KIỂM TRA 🚀
          </button>
        </div>
      </form>
    </div>
  `;

  window.scrollTo(0, 0);
}

function handleExamSelect(qId, oIdx) {
  currentExamAnswers[qId] = oIdx;

  const answeredCount = Object.keys(currentExamAnswers).length;
  const counterEl = document.getElementById('exam-counter-txt');
  if (counterEl) {
    counterEl.innerText = `${answeredCount} / 22 câu`;
  }

  const qcard = document.getElementById(`qcard-${qId}`);
  if (qcard) {
    qcard.classList.remove('qcard-missing');
    const labels = qcard.querySelectorAll('.opt-label');
    labels.forEach((lbl, idx) => {
      lbl.classList.toggle('opt-checked', idx === oIdx);
    });
  }
}

async function handleExamSubmit(e) {
  e.preventDefault();

  const missingQIds = [];
  EXAM_QUESTIONS.forEach(q => {
    if (currentExamAnswers[q.id] === undefined) {
      missingQIds.push(q.id);
    }
  });

  if (missingQIds.length > 0) {
    missingQIds.forEach(id => {
      const qcard = document.getElementById(`qcard-${id}`);
      if (qcard) qcard.classList.add('qcard-missing');
    });

    const firstMissing = document.getElementById(`qcard-${missingQIds[0]}`);
    if (firstMissing) {
      firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    alert(`Bạn còn ${missingQIds.length} câu chưa trả lời (đang được viền đỏ). Vui lòng trả lời hết 22 câu trước khi nộp bài!`);
    return;
  }

  if (!confirm('Bạn đã trả lời đầy đủ 22 câu. Bạn có chắc chắn muốn nộp bài thi ngay không?')) {
    return;
  }

  const submitBtn = document.getElementById('btn-submit-exam');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Đang chấm điểm và lưu kết quả...';
  }

  let correctCount = 0;
  EXAM_QUESTIONS.forEach(q => {
    if (currentExamAnswers[q.id] === q.answer) {
      correctCount++;
    }
  });

  const isPassed = correctCount >= 19;
  const user = getUser();
  user.exam_score = correctCount;
  user.exam_status = isPassed ? 'passed' : 'failed';
  user.exam_answers = { ...currentExamAnswers };
  user.exam_completed_at = new Date().toISOString();
  setUser(user);

  // Đồng bộ kết quả lên Supabase
  if (supabaseClient && user.phone) {
    try {
      const statusText = isPassed ? `ĐẬU SÁT HẠCH (${correctCount}/22)` : `RỚT SÁT HẠCH (${correctCount}/22)`;
      await supabaseClient.from('shipper_confirmations').upsert({
        phone: user.phone,
        name: user.name,
        role: user.role,
        progress: '8/8',
        status: statusText,
        exam_score: correctCount,
        exam_status: isPassed ? 'passed' : 'failed',
        updated_at: new Date().toISOString()
      }, { onConflict: 'phone' });
    } catch (err) {
      console.warn('Lỗi lưu kết quả thi lên Supabase:', err);
    }
  }

  document.body.classList.remove('in-exam-mode');
  location.hash = '#/exam-result';
}

function renderExamResult() {
  const user = getUser();
  if (!user) {
    showLoginModal();
    return;
  }

  document.body.classList.remove('in-exam-mode');
  document.title = 'Kết quả thi Sát hạch - Citiship';

  const score = user.exam_score || 0;
  const isPassed = user.exam_status === 'passed' || score >= 19;
  const percent = Math.round((score / 22) * 100);
  const answers = user.exam_answers || {};

  const reviewListHtml = EXAM_QUESTIONS.map((q, idx) => {
    const userChoice = answers[q.id];
    const isCorrect = userChoice === q.answer;
    return `
      <div class="result-review-card ${isCorrect ? 'ans-correct' : 'ans-wrong'}">
        <div class="rrc-top">
          <span class="rrc-num">Câu ${idx + 1}: ${q.category}</span>
          <span class="rrc-badge ${isCorrect ? 'badge-c' : 'badge-w'}">${isCorrect ? '✓ Đúng (+1đ)' : '✗ Chưa đúng (0đ)'}</span>
        </div>
        <div class="rrc-q">${q.question}</div>
        <div class="rrc-options">
          ${q.options.map((opt, oIdx) => {
            const isUserPick = userChoice === oIdx;
            const isAnswerKey = q.answer === oIdx;
            let optClass = '';
            let optTag = '';
            if (isAnswerKey) {
              optClass = 'opt-key';
              optTag = ' <span class="tag-key">[ĐÁP ÁN ĐÚNG]</span>';
            }
            if (isUserPick) {
              optClass += isCorrect ? ' opt-pick-correct' : ' opt-pick-wrong';
              optTag += isCorrect ? ' <span class="tag-pick-c">[BẠN ĐÃ CHỌN]</span>' : ' <span class="tag-pick-w">[BẠN ĐÃ CHỌN]</span>';
            }
            return `<div class="rrc-opt-line ${optClass}">${opt}${optTag}</div>`;
          }).join('')}
        </div>
        <div class="rrc-explain">
          💡 <b>Giải thích chi tiết:</b> ${q.explanation}
        </div>
      </div>
    `;
  }).join('');

  app.innerHTML = `
    <div class="exam-result-container">
      <div class="result-hero-card ${isPassed ? 'hero-pass' : 'hero-fail'}">
        <div class="result-hero-icon">${isPassed ? '🏆' : '⚠️'}</div>
        <h1>${isPassed ? 'XUẤT SẮC! BẠN ĐÃ ĐẠT BÀI THI SÁT HẠCH' : 'BẠN CHƯA ĐẠT TIÊU CHUẨN SÁT HẠCH'}</h1>
        <div class="result-score-circle">
          <div class="score-big">${score}<span>/22</span></div>
          <div class="score-sub">Tỷ lệ chính xác: ${percent}%</div>
        </div>
        <p class="result-desc">
          ${isPassed 
            ? 'Chúc mừng bạn đã hoàn thành xuất sắc bài kiểm tra kiến thức Citiship. Kết quả đã được ghi nhận trên hệ thống Quản trị để cấp phép chính thức vào ca!' 
            : 'Tiêu chuẩn đạt yêu cầu là đúng từ <b>19 / 22 câu</b> (≥ 85%). Vui lòng xem kỹ phần giải thích đáp án sai bên dưới và bấm nút <b>Thi lại</b> để hoàn tất sát hạch nhé!'}
        </p>
        <div class="result-actions">
          <a href="#/" class="btn-result-home">🏠 Quay về Trang chủ</a>
          <a href="#/exam" class="btn-result-retake">${isPassed ? '🔄 Làm lại bài thi' : '⚡ Thi lại ngay'}</a>
        </div>
      </div>

      <div class="result-review-section">
        <h3>🔍 Bảng Chi Tiết Đáp Án & Lời Giải Thích (22 Câu)</h3>
        <p class="review-sub">Đối chiếu câu trả lời của bạn với đáp án chuẩn của Citiship:</p>
        <div class="review-cards-list">
          ${reviewListHtml}
        </div>
        <div class="review-bottom-nav">
          <a href="#/" class="btn-result-home">🏠 Quay về Trang chủ</a>
          <a href="#/exam" class="btn-result-retake">⚡ Làm lại bài thi</a>
        </div>
      </div>
    </div>
  `;

  window.scrollTo(0, 0);
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
    if (isShipperRole(user.role)) {
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
    document.body.classList.remove('in-exam-mode');
    renderAdmin();
    return;
  }

  // Tuyến đường Phòng thi Sát hạch
  if (hash === 'exam') {
    renderExam();
    return;
  }

  // Tuyến đường Kết quả thi
  if (hash === 'exam-result') {
    renderExamResult();
    return;
  }

  // Rời khỏi phòng thi thì bỏ class khóa
  document.body.classList.remove('in-exam-mode');

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
