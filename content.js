// Toàn bộ nội dung nằm ở đây. Thêm mục mới = thêm 1 object vào PAGES.
// Nội dung hiện tại là NỘI DUNG MẪU, cần thay bằng nội dung thật.
const SITE = {
  title: 'Nội Quy & Quy Trình Citiship',
  intro: 'Hướng dẫn quy trình, chính sách và thao tác dành cho Đối tác giao hàng Citiship.'
};

const DRAFT = '<p class="draft">(Nội dung mẫu - chưa cập nhật)</p>';

const PAGES = [
  { id: 'chinh-sach', icon: '💰', tone: 'o', title: 'Chính sách, chiết khấu', summary: 'Mức chiết khấu và quyền lợi',
    steps: [
      { title: 'Ký quỹ 500k & Quy trình chấm dứt hợp tác', html: `
        <div class="quick-summary">💵 Ký quỹ 500.000đ khi vào làm (1 lần duy nhất) — Hoàn lại 100% khi chấm dứt hợp tác đúng quy trình.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Quy trình chấm dứt hợp tác chuẩn để nhận lại 500k</h4>
            <ol>
              <li><b>Báo trước 1 tuần</b> cho Quản lý / Công ty.</li>
              <li><b>Chạy tiếp trọn vẹn tuần kế tiếp</b> theo đúng bảng ca đã đăng ký.</li>
              <li>Thanh toán đầy đủ hóa đơn % chiết khấu tuần cuối cùng.</li>
            </ol>
            <p>👉 Hoàn tất đủ 3 bước trên: <b>Nhận lại 100% (500.000đ)</b> tiền ký quỹ.</p>
          </div>
          <div class="rule-card dont">
            <h4>❌ Tự ý dừng chạy ngang / Bỏ ca không báo trước</h4>
            <ul>
              <li>Hệ thống <b>đóng box vĩnh viễn</b>.</li>
              <li><span class="rule-tag red">Không hoàn trả tiền ký quỹ</span> dưới bất kỳ lý do gì.</li>
            </ul>
          </div>
        </div>` },

      { title: 'Chiết khấu & Đăng ký ca tuần', html: `
        <div class="quick-summary">📊 Mức % nộp về công ty dựa trên số giờ chạy thực tế của bạn.</div>
        <div class="rule-grid">
          <div class="rule-card warn">
            <h4>🛵 Tuần đầu tiên (Thử việc)</h4>
            <p>Mặc định nộp cố định: <span class="rule-tag orange">25% chiết khấu</span> (shipper giữ lại 75% phí ship). Chưa tính theo mốc giờ.</p>
          </div>
          <div class="rule-card do">
            <h4>⚡ Từ tuần thứ 2 (Chính thức)</h4>
            <ul>
              <li>Chiết khấu tính lũy tiến theo <b>GIỜ CHẠY THỰC TẾ</b> trong tuần (tổng giờ sau khi đã trừ các ca bị xóa do vi phạm quy định — giờ càng cao % nộp càng giảm).</li>
              <li>Bắt buộc đăng ký tối thiểu: <span class="rule-tag green">30 giờ / tuần</span>.</li>
              <li>Hạn đăng ký: <b>Thứ 7 & Chủ Nhật</b> (hệ thống đóng lúc <b>00:00 Thứ 2</b>).</li>
            </ul>
          </div>
        </div>` },

      { title: 'Bảng % chiết khấu theo giờ chạy', html: `
        <div class="quick-summary">📈 Chạy càng nhiều giờ — % nộp về công ty càng thấp (thu nhập càng cao).</div>
        <p>Áp dụng bảng quy chuẩn hiện hành (cập nhật mới nhất). Chạy đủ mốc giờ nào thì áp dụng thang % nộp tương ứng cho tuần đó:</p>
        <div class="note">
          ⚠️ <b>ĐỊNH NGHĨA GIỜ CHẠY THỰC TẾ ĐỂ TÍNH % CHIẾT KHẤU:</b><br>
          <b>Giờ chạy thực tế = Tổng giờ chạy trong tuần TRỪ ĐI các ca đã bị xóa do vi phạm quy định</b> (như: vào trễ quá 5p, ra khỏi nội ô quá 15p, không bật/thả định vị, ca không hoàn thành đơn nào...).<br>
          👉 <i>Nghĩa là giờ thực tế sẽ trừ mấy ca đã bị xóa khi vi phạm — ca nào bị xóa thì mất trọn số giờ của ca đó, không được tính vào tổng giờ tuần để xét bậc chiết khấu!</i>
        </div>
        <table>
          <tr><th>Mốc GIỜ CHẠY THỰC TẾ / tuần</th><th>% Nộp về công ty</th><th>Thu nhập giữ lại</th></tr>
          <tr><td>30 giờ (Mức tối thiểu)</td><td>24%</td><td>76%</td></tr>
          <tr><td>35 giờ</td><td>23%</td><td>77%</td></tr>
          <tr><td>40 giờ</td><td>22%</td><td>78%</td></tr>
          <tr class="row-orange"><td><b>50 giờ (Mốc phổ biến)</b></td><td><b>21%</b></td><td><b>79%</b></td></tr>
          <tr><td>60 giờ</td><td>20%</td><td>80%</td></tr>
          <tr><td>70 giờ</td><td>19%</td><td>81%</td></tr>
          <tr class="row-blue"><td><b>75 giờ (Mốc chuyên cần)</b></td><td><b>18%</b></td><td><b>82%</b></td></tr>
          <tr><td>80 giờ</td><td>17%</td><td>83%</td></tr>
          <tr><td>85 giờ</td><td>16%</td><td>84%</td></tr>
          <tr><td>90 giờ</td><td>15%</td><td>85%</td></tr>
          <tr><td>95 giờ</td><td>14%</td><td>86%</td></tr>
          <tr class="row-green"><td><b>100 giờ (Mốc xuất sắc)</b></td><td><b>13%</b></td><td><b>87%</b></td></tr>
          <tr><td>105 giờ trở lên</td><td><b>12%</b></td><td><b>88%</b></td></tr>
        </table>
        <div class="note" style="margin-top: 10px;">
          📌 <b>QUY TẮC MỐC GIỜ TRUNG GIAN:</b> Nếu số giờ chạy thực tế nằm giữa 2 mốc (chưa đạt tới mốc kế tiếp), hệ thống sẽ tính theo <b>mốc thấp hơn liền kề</b>.<br>
          <i>Ví dụ:</i> Chạy 45h (chưa đạt 50h) tính theo mốc 40h = 22%; Chạy 65h (chưa đạt 70h) tính theo mốc 60h = 20%.
        </div>

        <h3>💵 Ví dụ minh họa thực tế tính tiền nộp Thứ 2:</h3>
        <p>Giả sử trong tuần tổng tiền ship bạn kiếm được là <b>1.000.000đ</b>:</p>
        <table>
          <tr><th>Mốc giờ chạy thực tế</th><th>% Nộp</th><th>Số tiền nộp về cty</th><th>Thực nhận của Shipper</th></tr>
          <tr><td>Tuần đầu (Thử việc)</td><td>25%</td><td><b>250.000đ</b></td><td><span class="rule-tag green">750.000đ</span></td></tr>
          <tr><td>Chạy 30h (Tối thiểu)</td><td>24%</td><td><b>240.000đ</b></td><td><span class="rule-tag green">760.000đ</span></td></tr>
          <tr class="row-orange"><td><b>Chạy 50h (Phổ biến)</b></td><td>21%</td><td><b>210.000đ</b></td><td><span class="rule-tag green"><b>790.000đ</b></span></td></tr>
          <tr class="row-blue"><td><b>Chạy 75h (Chuyên cần)</b></td><td>18%</td><td><b>180.000đ</b></td><td><span class="rule-tag green"><b>820.000đ</b></span></td></tr>
          <tr class="row-green"><td><b>Chạy 100h (Xuất sắc)</b></td><td>13%</td><td><b>130.000đ</b></td><td><span class="rule-tag green"><b>870.000đ</b></span></td></tr>
        </table>
        <small style="color:var(--muted)">* Chưa bao gồm các khoản thưởng cao điểm, thưởng box chung hoặc trừ phạt nếu có.</small>` },

      { title: 'Thưởng giờ cao điểm', html: `
        <div class="quick-summary">🎁 Chạy vào khung giờ cao điểm đông đơn được giảm thêm % chiết khấu (được cộng gộp).</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>🌅 Cao điểm sáng (7h - 9h)</h4>
            <ul>
              <li>Điều kiện: Chạy tối thiểu <b>10 giờ</b> trong ít nhất <b>5 ngày</b> (khung sáng chỉ có 2 tiếng/ngày nên thực tế phải chạy đủ cả 5 ngày trong tuần).</li>
              <li>Mức thưởng: <span class="rule-tag green">Giảm 1% chiết khấu</span>.</li>
            </ul>
          </div>
          <div class="rule-card do">
            <h4>🌆 Cao điểm chiều tối (16h - 22h)</h4>
            <ul>
              <li>Điều kiện: Chạy tối thiểu <b>35 giờ</b> trong ít nhất <b>6 ngày</b>.</li>
              <li>Mức thưởng: <span class="rule-tag green">Giảm 1% chiết khấu</span>.</li>
            </ul>
          </div>
        </div>
        <div class="note"><b>Lưu ý bắt buộc:</b> Phải đăng ký đủ tối thiểu <b>30 giờ / tuần</b> mới được xét thưởng cao điểm. Đạt cả 2 khung sẽ được <span class="rule-tag green">cộng gộp thưởng 2%</span>!</div>` },

      { title: 'Thưởng giật đơn box chung', html: `
        <div class="quick-summary">📦 Box chung là kênh nhận thêm đơn ngoài ca giúp tăng thu nhập và nhận thưởng.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Mức thưởng box chung tuần</h4>
            <ul>
              <li>Tỷ lệ lấy từ <b>20% - 29%</b>: <span class="rule-tag green">Thưởng giảm 1%</span>.</li>
              <li>Tỷ lệ lấy từ <b>30% trở lên</b>: <span class="rule-tag green">Thưởng giảm 2%</span>.</li>
            </ul>
          </div>
          <div class="rule-card warn">
            <h4>💡 Cách tính tỷ lệ</h4>
            <p><b>Tỷ lệ</b> = (Số đơn box chung hoàn thành / Tổng đơn cả tuần) × 100%.</p>
            <small>Chỉ tính đơn đã hoàn thành có bấm "Đã lấy/Đã mua" và tải ảnh bằng chứng.</small>
          </div>
        </div>
        <div class="note"><b>Lưu ý:</b> Shipper thử việc tuần đầu không tham gia giật đơn box chung.</div>` },

      { title: 'Phạt đăng ký ca và thiếu giờ', html: `
        <div class="quick-summary">⚠️ Chế tài xử phạt khi không đăng ký ca hoặc chạy thiếu giờ đăng ký.</div>
        <div class="rule-grid">
          <div class="rule-card dont">
            <h4>❌ Không đăng ký ca tuần</h4>
            <p>Quên đăng ký ca hoặc đăng ký trễ sau 00:00 Thứ 2:</p>
            <p><span class="rule-tag red">Phạt cộng thêm 1% chiết khấu</span> tuần đó.</p>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chạy thiếu giờ so với đã đăng ký</h4>
            <p>Hệ thống so sánh <b>Giờ chạy thực tế</b> (đã trừ các ca bị xóa do vi phạm) với số giờ bạn đã đăng ký:</p>
            <ul>
              <li>Thiếu dưới 10%: <span class="rule-tag red">Phạt 1%</span></li>
              <li>Thiếu dưới 20%: <span class="rule-tag red">Phạt 2%</span></li>
              <li>Thiếu dưới 30%: <span class="rule-tag red">Phạt 3%</span></li>
              <li>Thiếu dưới 40%: <span class="rule-tag red">Phạt 4%</span></li>
            </ul>
          </div>
        </div>
        <div class="note"><b>Ví dụ:</b> Đăng ký 30h nhưng chỉ chạy 20h (bỏ 10h = thiếu 33%) → Bị phạt thêm <b>4%</b> vào bảng chiết khấu!</div>
        <div class="note" style="margin-top: 10px; border-left: 4px solid var(--accent);">
          ⚖️ <b>NGUYÊN TẮC KHÔNG PHẠT CHỒNG CHÉO (TRÁNH PHẠT 3 LỚP):</b><br>
          Trường hợp ca làm việc đã bị xử lý xóa giờ (do vào trễ quá 5p, ngoài nội ô quá 15p...), thì <b>số giờ của ca bị xóa sẽ KHÔNG bị tính cộng dồn vào phần trăm phạt thiếu giờ đăng ký tuần</b> (1 lỗi vi phạm chỉ xử lý 1 lần, tuyệt đối không phạt đúp nhiều tầng)!
        </div>` },

      { title: 'Phạt không giật đơn box chung', html: `
        <div class="quick-summary">⚡ Trách nhiệm hỗ trợ cướp đơn box chung khi rảnh rỗi.</div>
        <div class="rule-card dont">
          <h4>❌ Chế tài khi lười giật đơn</h4>
          <p>Tỷ lệ hoàn thành đơn từ box chung <b>dưới 10%</b> tổng đơn tuần:</p>
          <p><span class="rule-tag red">Phạt cộng thêm 2% chiết khấu</span></p>
        </div>
        <div class="note"><b>Miễn trừ:</b> Shipper thử việc (tuần đầu tiên) không bị áp dụng mức phạt này.</div>` },

      { title: 'Thời gian trả bảng % & Phạt đóng trễ', html: `
        <div class="quick-summary">🕒 Chiều Thứ 2 gửi bảng chiết khấu — Hoàn tất nộp trước 22h00 tối Thứ 2.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Thời gian nhận bảng & Đối soát</h4>
            <ul>
              <li><b>Chiều Thứ 2:</b> Hệ thống tự động gửi bảng kê chiết khấu về tài khoản.</li>
              <li>Thắc mắc về giờ chạy / tiền phạt: <b>Liên hệ Tổng đài giải đáp ngay</b> trước khi nộp.</li>
              <li>Hạn nộp thanh toán: <b>Trước 22h00 tối Thứ 2</b>.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Mức phạt khi nộp trễ hạn</h4>
            <ul>
              <li>Từ 22h00 đến 23h59 Thứ 2: <span class="rule-tag red">Phạt 20.000đ / lần</span></li>
              <li>Từ 00:00 Thứ 3 trở đi: <span class="rule-tag red">Phạt 50.000đ / ngày trễ</span> (nhân theo số ngày trễ).</li>
            </ul>
          </div>
        </div>` }
    ] },
  { id: 'quy-dinh', icon: '🛡️', tone: 'b', title: 'Quy định', summary: 'Nội quy & Chế tài làm việc',
    steps: [
      { title: '3 Tầng Trí Nhớ & 15 Quy Tắc Đỏ', html: `
        <div class="quick-summary">🎯 Không bắt học thuộc lòng mọi chi tiết — Tập trung nhớ kỹ các hành vi gây mất tiền, mất hàng, tai nạn hay gian lận!</div>
        
        <h3>Bảng phân loại 3 tầng ghi nhớ:</h3>
        <table class="memory-table">
          <tr><th>Tầng ghi nhớ</th><th>Mục tiêu</th><th>Nội dung trọng tâm</th><th>Chuẩn đạt</th></tr>
          <tr class="row-orange">
            <td><b>🔴 ĐỎ - Cốt lõi</b></td>
            <td>Phải nhớ và thực hiện đúng</td>
            <td>Gọi trước khi mua/rời shop, không tự đổi phí, không tin bill ảnh, xử lý boom, ảnh bằng chứng, không dùng hộ tài khoản</td>
            <td><b>100%</b></td>
          </tr>
          <tr>
            <td><b>🟡 VÀNG - Vận hành</b></td>
            <td>Làm đúng quy trình thường ngày</td>
            <td>Vào ca, đổi ca, box chung, công nợ, lệnh hệ thống, hoàn tất đơn</td>
            <td>≥ 85%</td>
          </tr>
          <tr class="row-blue">
            <td><b>🔵 XANH - Tra cứu</b></td>
            <td>Tìm được khi cần</td>
            <td>Bảng chiết khấu, thưởng, kênh liên hệ, hướng dẫn giao diện app</td>
            <td>Tra cứu khi cần</td>
          </tr>
        </table>

        <h3>🚨 Danh sách 15 Quy tắc Đỏ cốt lõi (Bắt buộc thực hiện 100%):</h3>
        <div class="rule-card dont" style="margin-bottom: 14px;">
          <ol style="margin: 0; padding-left: 20px; line-height: 1.85;">
            <li><b>Không mua hàng</b> trước khi gọi xác nhận món & địa chỉ.</li>
            <li><b>Không rời shop</b> trước khi gọi người nhận.</li>
            <li><b>Không ứng tiền</b> khi có bất kỳ dấu hiệu bất thường nào.</li>
            <li><b>Không tin ảnh bill chuyển khoản</b>; phải kiểm tra biến động số dư thực nhận.</li>
            <li><b>Không tự ý thay đổi</b> phí ship hoặc đòi thêm phụ phí ngoài app.</li>
            <li><b>Đổi địa chỉ / ship báo sau</b> bắt buộc phải được Tổng đài phê duyệt.</li>
            <li><b>Chụp đủ</b> hình hàng hóa, hóa đơn và log cuộc gọi bằng Timestamp.</li>
            <li><b>Boom hàng</b> phải lập tức dừng xử lý và tag ngay Tổng đài.</li>
            <li><b>Không nhận đơn riêng</b> ngoài hệ thống công ty.</li>
            <li><b>Không tạo đơn ảo</b> hoặc ngâm đơn, treo đơn ăn giờ.</li>
            <li><b>Không cho người khác</b> mượn dùng tài khoản chạy chui.</li>
            <li><b>Giao xong</b> phải bấm hoàn tất đơn và báo lại vị trí ngay.</li>
            <li><b>Không kê giá món ăn</b> hoặc giữ tiền thừa không thối khách.</li>
            <li><b>Không tự ý bỏ ca</b>; bận việc phải báo xin off theo quy trình.</li>
            <li><b>Tai nạn / thời tiết nguy hiểm:</b> Luôn ưu tiên an toàn bản thân, không cố giao hàng.</li>
          </ol>
        </div>` },

      { title: 'Chụp ảnh vào ca', html: `
        <div class="quick-summary">📸 Chụp selfie bằng Timestamp Camera để điểm danh vào ca làm.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Ảnh & Vị trí hợp lệ</h4>
            <ul>
              <li>Dùng app <b>Timestamp Camera</b> (selfie thấy rõ mặt, mặc đồng phục).</li>
              <li>Bật định vị hiện rõ <b>ngày giờ, địa điểm cụ thể</b>.</li>
              <li><b>Thả vị trí nội ô:</b> Bắt buộc phải thả vị trí trong khu vực nội ô mới vào ca.</li>
              <li>Thời gian chụp chỉ được lệch <span class="rule-tag orange">tối đa 15 phút</span>.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Tuyệt đối cấm</h4>
            <ul>
              <li>Không dùng cam thường hoặc cam Telegram.</li>
              <li>Không dùng ảnh cũ, ảnh chụp lại từ màn hình khác.</li>
              <li><b>Vào ca ngoài nội ô:</b> Nếu vào ca ngoài nội ô mà quá 15 phút không di chuyển vào nội ô thì sẽ <span class="rule-tag red">bị bot kick ra khỏi ca</span>!</li>
              <li>Vi phạm: <span class="rule-tag red">Xóa giờ ca đó</span>.</li>
            </ul>
          </div>
        </div>
        <figure>
          <img src="images/vi-du-chup-anh-vao-ca.jpg" alt="Ví dụ chụp ảnh vào ca Timestamp hợp lệ">
          <figcaption>Ví dụ ảnh vào ca chuẩn: Chụp Timestamp hiện ngày giờ, vị trí rõ ràng và caption lệnh <code>/vaoca [vị_trí] [số_tiền]</code> (ví dụ: <code>/vaoca 30/4 1tr</code>).</figcaption>
        </figure>
        <div class="note">👉 Thao tác vào ca xem chi tiết tại mục <a href="#/huong-dan-app"><b>Hướng dẫn thao tác</b></a>.</div>` },

      { title: 'Giờ vào ca & Xin vào trễ', html: `
        <div class="quick-summary">⏰ Vào ca đúng giờ để hệ thống không tự động khóa slot chạy.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Khung giờ chuẩn</h4>
            <ul>
              <li>Được vào ca <b>trước 15 phút</b> (khi bot gửi tin nhắc).</li>
              <li>Cho phép vào trễ <span class="rule-tag orange">tối đa 5 phút</span>.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Quá 5 phút trễ</h4>
            <ul>
              <li>Hệ thống <b>tự động khóa ca</b>.</li>
              <li>Phải đợi lúc kẹt đơn hoặc tổng đài mở pin tăng ca mới được vào (nghĩa là khung giờ đó kẹt đơn và Tổng đài kích hoạt mở thêm suất chạy/tăng ca trên hệ thống).</li>
            </ul>
          </div>
        </div>
        <h3>Cách xin vào ca trễ (Phải báo TRƯỚC giờ ca bắt đầu):</h3>
        <div class="rule-card warn">
          <h4>⚠️ Cú pháp xin vào trễ:</h4>
          <p>Nếu có việc đột xuất biết trước sẽ trễ, <b>phải nhắn báo trước giờ ca</b> cho Tổng đài. Khi đến nơi vào ca: Chụp ảnh Timestamp ngay lúc đó + gửi lệnh: <code>/vaoca [vị_trí] [số_tiền]</code> (ví dụ: <code>/vaoca 30/4 1tr</code>) và <b>tag Tổng đài</b> để được duyệt vào ca trễ.</p>
          <ul>
            <li>Ca đang <b>thiếu shipper</b>: Tổng đài có thể duyệt cho vào.</li>
            <li>Ca đang <b>đông shipper</b>: Phải đợi đến ca tăng ca tiếp theo.</li>
          </ul>
        </div>
        <div class="note"><b>Lưu ý:</b> Bị thiếu giờ chạy do vào trễ vẫn bị tính phạt theo quy định thiếu giờ!</div>` },

      { title: 'Chụp hình khi đi đơn', html: `
        <div class="quick-summary">📦 100% đơn hàng phải chụp ảnh bằng chứng bằng Timestamp Camera.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>🍜 Đơn mua hàng (Đồ ăn/quán)</h4>
            <ul>
              <li>Chụp <b>biển hiệu quán</b> + Hóa đơn (hoặc note tay).</li>
              <li>Chụp <b>log cuộc gọi xác nhận</b> trước khi mua.</li>
            </ul>
          </div>
          <div class="rule-card do">
            <h4>🎁 Đơn giao hàng (Shop)</h4>
            <ul>
              <li>Chụp <b>gói hàng tại shop</b> (hàng hở chụp rõ bên trong).</li>
              <li>Chụp <b>log cuộc gọi</b> trước khi rời shop.</li>
            </ul>
          </div>
          <div class="rule-card do">
            <h4>🚚 Đơn gửi bưu điện / xe tải</h4>
            <ul>
              <li>Chụp hóa đơn biên nhận.</li>
              <li>Chụp biển số xe tải & SĐT tài xế (nếu có).</li>
            </ul>
          </div>
          <div class="rule-card do">
            <h4>🛵 Đơn xe ôm</h4>
            <ul>
              <li>Chụp đồng hồ xe <b>lúc khách lên</b>.</li>
              <li>Chụp đồng hồ xe <b>lúc khách xuống</b> để tính km.</li>
            </ul>
          </div>
        </div>
        <div class="note"><b>Vì sao phải chụp?</b> Khi có khiếu nại thiếu hàng, ảnh chụp tại shop là bằng chứng duy nhất minh oan cho bạn!</div>` },

      { title: 'Đơn gửi bảo vệ & Đơn quà tặng', html: `
        <div class="quick-summary">🛡️ Áp dụng cho: Gửi bảo vệ, quà tặng, không thu hộ, người khác nhận giùm.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Thao tác cần làm</h4>
            <ul>
              <li>Xin chụp 1 ảnh <b>rõ người nhận / vị trí bàn bảo vệ</b> bằng Timestamp Camera.</li>
              <li>Lưu lại bằng chứng xác nhận đã giao đúng người, đúng nơi.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Rủi ro nếu không chụp</h4>
            <ul>
              <li>Khách báo chưa nhận được hoặc thất lạc đồ.</li>
              <li>Shipper phải tự quay lại giải quyết, tốn thời gian & tiền xăng!</li>
            </ul>
          </div>
        </div>` },

      { title: 'Quy định & Xử phạt thiếu ảnh', html: `
        <div class="quick-summary">⚖️ 100% đơn phải có ảnh Timestamp hiện rõ ngày giờ và vị trí định vị.</div>
        <div class="rule-grid">
          <div class="rule-card dont">
            <h4>❌ Bậc thang xử lý vi phạm (Cộng dồn trong tuần)</h4>
            <ol>
              <li><b>Lần 1:</b> Nhắc nhở.</li>
              <li><b>Lần 2:</b> Khóa nhận đơn box chung <span class="rule-tag red">1 ngày</span>.</li>
              <li><b>Lần 3:</b> Khóa nhận đơn box chung <span class="rule-tag red">1 tuần</span>.</li>
              <li><b>Tái phạm:</b> <span class="rule-tag red">Dừng hợp tác</span>.</li>
            </ol>
          </div>
          <div class="rule-card warn">
            <h4>💸 Phạt tổng kết tuần (% đơn thiếu ảnh)</h4>
            <p>Cứ mỗi <b>5% đơn thiếu ảnh</b> = phạt thêm <b>1% nộp tuần</b>:</p>
            <ul>
              <li>Thiếu từ 5% đến &lt; 10%: <span class="rule-tag orange">Phạt 1%</span></li>
              <li>Thiếu từ 10% đến &lt; 15%: <span class="rule-tag orange">Phạt 2%</span></li>
              <li>Thiếu từ 15% đến &lt; 20%: <span class="rule-tag orange">Phạt 3%</span></li>
              <li>Thiếu từ 20% trở lên: <span class="rule-tag red">Phạt 4% và xem xét tạm khóa ca</span></li>
            </ul>
          </div>
        </div>` },

      { title: 'Gọi khách xác nhận trước', html: `
        <div class="quick-summary">📞 Quy tắc quan trọng: BẮT BUỘC gọi khách trước khi mua hoặc trước khi rời shop!</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Thao tác chuẩn</h4>
            <ul>
              <li><b>Đơn mua:</b> Gọi chốt món & địa chỉ <b>TRƯỚC KHI MUA</b>.</li>
              <li><b>Đơn giao:</b> Gọi chốt tiền ship & địa chỉ <b>TRƯỚC KHI RỜI SHOP</b>.</li>
              <li>Chụp ảnh nhật ký cuộc gọi gửi kèm đơn.</li>
              <li>Khách không nghe máy: <b>Tag ngay @citiship_cantho</b>.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Hậu quả nếu KHÔNG gọi trước</h4>
            <ul>
              <li><span class="rule-tag red">Không được thu tiền ship</span> đơn đó.</li>
              <li><span class="rule-tag red">Phạt 1 nợ công</span> bằng đúng phí ship của đơn.</li>
              <li>Nếu bị boom hàng: <b>Công ty từ chối hỗ trợ 100%</b>!</li>
            </ul>
          </div>
        </div>` },

      { title: 'Dụng cụ cần trang bị', html: `
        <div class="quick-summary">🎒 Kiểm tra đủ 4 món trước khi vào ca để tránh bị phạt nợ công.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ 4 món bắt buộc</h4>
            <ol>
              <li><b>1 nón bảo hiểm phụ</b> (sạch sẽ cho khách).</li>
              <li><b>3 sợi dây ràng</b> hàng hóa.</li>
              <li><b>Áo đi mưa</b> (nên có 2 cái).</li>
              <li><b>Túi chống nước / giữ nhiệt</b>.</li>
            </ol>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài xử phạt</h4>
            <p>Quên hoặc thiếu bất kỳ món nào khi kiểm tra:</p>
            <p><span class="rule-tag red">Phạt 50.000đ / 1 dụng cụ / 1 lần</span></p>
            <small>Tiền phạt ghi vào nợ công ty và nộp vào Thứ 2.</small>
          </div>
        </div>` },

      { title: 'Đồng phục Citiship', html: `
        <div class="quick-summary">👕 Mặc đồng phục suốt ca làm việc để nhận diện thương hiệu.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Mua áo & Tiêu chuẩn</h4>
            <ul>
              <li>Trong tuần đầu tiên (thử việc): <span class="rule-tag green">Giá ưu đãi 200.000đ / áo</span> (chưa bắt buộc có áo ngay trong những ngày đầu thử việc).</li>
              <li>Từ tuần thứ 2 trở đi: <span class="rule-tag orange">250.000đ / áo</span>.</li>
              <li>Ảnh selfie vào ca mặc đồng phục thì <b>phải mặc suốt cả ca</b>.</li>
              <li>Ngày giặt áo: Không mặc đồng phục <span class="rule-tag orange">tối đa 30%</span> tổng giờ tuần.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Xử phạt vi phạm</h4>
            <ul>
              <li>Giữa ca cởi áo hoặc mặc áo khác: <span class="rule-tag red">Xóa giờ ca làm việc đó</span> và cảnh cáo; tái phạm nhiều lần sẽ xem xét dừng hợp tác.</li>
              <li>Không đồng phục quá 30% số giờ: <span class="rule-tag red">Xóa giờ tất cả ca không đồng phục</span>.</li>
              <li>Lộn trái áo: Tính là không hợp lệ.</li>
            </ul>
          </div>
        </div>
        <div class="note">Nhận áo xong: Chụp 1 ảnh selfie chính diện rõ mặt gửi group để làm avatar.</div>` },

      { title: 'Tác phong: Quần dài & Không chở người', html: `
        <div class="quick-summary">👖 Giữ hình ảnh chuyên nghiệp và an toàn tuyệt đối khi đi đơn.</div>
        <div class="rule-grid">
          <div class="rule-card dont">
            <h4>🚫 CẤM CHỞ BẠN THEO CÙNG (Trừ khách đơn xe ôm)</h4>
            <p>Phát hiện chở bạn bè, người thân đi làm cùng trong ca làm việc (trừ trường hợp đang chở khách của đơn xe ôm/chở người):</p>
            <p><span class="rule-tag red">Phạt 100.000đ / 1 lần vi phạm</span></p>
          </div>
          <div class="rule-card dont">
            <h4>👖 BẮT BUỘC MẶC QUẦN DÀI</h4>
            <p>Trong ca làm việc luôn luôn mặc quần dài lịch sự:</p>
            <p><span class="rule-tag red">Mặc quần ngắn: Phạt 50.000đ / 1 lần</span></p>
          </div>
        </div>` },

      { title: 'Nói không với chạy chui & Random check', html: `
        <div class="quick-summary">⛔ Tuyệt đối không cho mượn tài khoản — Kiểm tra ngẫu nhiên bằng Bot.</div>
        <div class="rule-card dont" style="margin-bottom: 14px;">
          <h4>❌ Cho mượn tài khoản chạy chui:</h4>
          <ul>
            <li><b>Chấm dứt hợp tác ngay lập tức.</b></li>
            <li>Ghi nợ công bằng <b>toàn bộ phí ship của tuần</b>.</li>
            <li>Chuyển cơ quan chức năng xử lý nếu có dấu hiệu vi phạm pháp luật (lộ dữ liệu đơn hàng, lạm dụng tín nhiệm).</li>
          </ul>
        </div>
        <h3>Kiểm tra ngẫu nhiên (Bot random 1 tiếng 20 bạn):</h3>
        <div class="rule-card warn">
          <h4>⚠️ Khi nhận tin nhắn kiểm tra từ Bot:</h4>
          <ul>
            <li>Chụp selfie cùng quán/xe (<b>không đeo khẩu trang</b>) + ảnh biển số xe bằng Timestamp Camera.</li>
            <li>Gửi vào box kèm cú pháp caption: <code>/random</code>.</li>
            <li>Thời hạn: Gửi trong vòng <span class="rule-tag orange">10 phút</span> (Quá 10 phút: <span class="rule-tag red">Xóa ca hiện tại</span>).</li>
          </ul>
        </div>
        <div class="note">
          ⚠️ <b>LƯU Ý AN TOÀN KHI RANDOM CHECK:</b><br>
          Nếu đang điều khiển xe trên đường, tuyệt đối <b>KHÔNG vừa lái xe vừa chụp ảnh</b>. Shipper hãy chủ động tấp xe vào lề an toàn rồi mới chụp ảnh gửi hệ thống (thời hạn 10 phút hoàn toàn đủ để dừng xe an toàn).
        </div>
        <figure>
          <img src="images/vi-du-random-check.png" alt="Ví dụ gửi hình khi bot random check">
          <figcaption>Ví dụ: shipper gửi selfie và ảnh xe có vị trí, giờ hợp lệ.</figcaption>
        </figure>` },

      { title: 'Điều kiện ca làm hợp lệ & Xóa giờ chạy', html: `
        <div class="quick-summary">⚠️ Ca làm sẽ bị HỦY / XÓA GIỜ nếu vi phạm — Số giờ ca bị xóa sẽ KHÔNG được tính vào Giờ chạy thực tế tuần!</div>
        <div class="rule-card dont">
          <h4>❌ 3 lý do bị xóa giờ ca làm ngay:</h4>
          <ol>
            <li>Từ lúc vào ca đến hết ca <b>không hoàn thành được đơn nào</b> (ca phải có phát sinh phí ship).<br><i>* Miễn trừ: Nếu suốt ca shipper vẫn bật GPS liên tục, giữ đúng khu vực phân bổ nhưng do hệ thống ít đơn khách quan thì Tổng đài sẽ kiểm tra log định vị để không xóa giờ.</i></li>
            <li><b>Không bật/thả location vị trí</b> suốt ca.</li>
            <li><b>Không thả vị trí vào khu vực trung tâm nội ô</b> (gồm các phường: Ninh Kiều, Cái Khế, Tân An, An Bình). Vào ca ngoài nội ô quá 15 phút không di chuyển vào nội ô sẽ bị Bot tự động kick khỏi ca.</li>
          </ol>
        </div>
        <div class="note">
          ⚠️ <b>HẬU QUẢ KHI BỊ XÓA GIỜ CA:</b><br>
          <b>Giờ chạy thực tế = Tổng giờ trong tuần TRỪ ĐI các ca đã bị xóa khi vi phạm</b>.<br>
          Nếu bị xóa ca làm, tổng giờ thực tế của bạn sẽ bị tụt xuống dẫn đến tăng bậc % chiết khấu của tuần. Tuy nhiên, theo <b>Nguyên tắc không phạt chồng chéo</b>: số giờ của ca đã bị xóa sẽ <b>không bị phạt đúp thêm vào chế tài thiếu giờ đăng ký tuần</b>!
        </div>` },

      { title: 'Quy định đổi ca & Nhóm Telegram', html: `
        <div class="quick-summary">🔄 Quy định khi có việc bận cần đổi ca và 2 kênh thông tin chính thức.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Điều kiện đổi ca</h4>
            <ul>
              <li>Số tiếng ca mới phải <b>bằng đúng số tiếng đã đăng ký</b>.</li>
              <li>Chỉ được đổi <b>trong tuần hiện tại</b> (không đổi sang tuần sau).</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Ngày KHÔNG duyệt đổi ca</h4>
            <ul>
              <li><span class="rule-tag red">Thứ 7, Chủ Nhật & Ngày Lễ</span>: Tuyệt đối không duyệt đổi ca hoặc off ca vì là ngày cao điểm.</li>
            </ul>
          </div>
        </div>
        <h3>2 nhóm Telegram chính thức:</h3>
        <ul>
          <li>📢 <b>Kênh Thông Báo Tổng:</b> Nhận tin tức, ca trống, thông báo thưởng và tăng ca.</li>
          <li>👥 <b>Group Anh Em Shipper:</b> Trao đổi hỗ trợ nhau đi ca, hỏi đường, báo sự cố.</li>
        </ul>
        <div class="note">
          🔒 <b>Cấp quyền vào nhóm:</b> Vì lý do bảo mật nội bộ và tránh người ngoài, link tham gia sẽ được Tổng đài gửi và duyệt trực tiếp sau khi bạn hoàn tất hồ sơ đăng ký (hoặc liên hệ qua mục Chat trên App để được cấp quyền vào nhóm).
        </div>` }
    ] },
  { id: 'trung-thuc', icon: '🤝', tone: 'o', title: 'Trung thực & thái độ', summary: 'Tác phong với khách và cửa hàng',
    steps: [
      { title: 'Không nhận đơn riêng', html: `
        <div class="quick-summary">🚫 Tuyệt đối không tự ý chạy đơn riêng ngoài hệ thống — Bảo vệ quyền lợi và an toàn của chính bạn.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Cách xử lý đúng chuẩn</h4>
            <p>Nếu khách quen hoặc chủ shop liên hệ nhờ bạn chạy đơn riêng ngoài app: <b>Shipper liên hệ Tổng đài gửi thông tin đơn để Tổng đài tạo đơn trên hệ thống và bắn lại cho chính mình chạy</b> (vừa có doanh thu vừa được công ty bảo hiểm đơn hàng hợp lệ).</p>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài vi phạm</h4>
            <p>Tuyệt đối không tự ý nhận chạy chui không báo qua Tổng đài để lấy trọn tiền ship. Phát hiện vi phạm:</p>
            <p><span class="rule-tag red">Ngưng hợp tác vĩnh viễn ngay lập tức</span></p>
          </div>
        </div>` },

      { title: 'Không tạo đơn ảo', html: `
        <div class="quick-summary">🚫 Cấm tạo đơn khống / đơn ảo để treo giờ nhận hỗ trợ hoặc né tránh đi đơn công ty.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Quy trình đơn tự tạo</h4>
            <ul>
              <li>Tạo đơn thật: Chụp hình hàng hóa rõ ràng tại điểm lấy.</li>
              <li>Báo xong ngay khi hoàn thành giao hàng.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài vi phạm</h4>
            <p>Phát hiện tạo đơn ảo để giữ ca, gian lận giờ chạy:</p>
            <p><span class="rule-tag red">Ngưng hợp tác ngay lập tức</span></p>
          </div>
        </div>` },

      { title: 'Không chạy nhiều app cùng lúc', html: `
        <div class="quick-summary">🛵 Chỉ hợp tác và chạy duy nhất app Citiship để đảm bảo tốc độ và bảo mật đơn hàng.</div>
        <div class="rule-grid">
          <div class="rule-card dont">
            <h4>❌ Quy định cấm</h4>
            <ul>
              <li>Tuyệt đối không bật chạy cùng lúc các app giao hàng khác.</li>
              <li>Vì tính bảo mật thông tin, không chạy app khác <b>dù có ca hay đang không có ca</b>, tính từ lúc mở tài khoản tại Citiship.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài xử lý</h4>
            <p>Phát hiện chạy nhiều app song song:</p>
            <p><span class="rule-tag red">Khóa tài khoản, ngưng hợp tác</span></p>
          </div>
        </div>` },

      { title: 'Không kê tiền (Hàng & Cước ship)', html: `
        <div class="quick-summary">💰 Trung thực là nguyên tắc hàng đầu — Gian lận tiền bạc vi phạm 1 lần là khóa tài khoản vĩnh viễn!</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Thu đúng giá quy định</h4>
            <ul>
              <li>Thu đúng giá ship hệ thống báo.</li>
              <li>Đơn mua hàng: Đưa khách hóa đơn đầy đủ.</li>
              <li><b>Thối đúng tiền thừa:</b> Đơn 16k, 18k phải thối đủ, không tự ý làm tròn 20k nếu khách chưa chủ động cho tip.</li>
              <li>Mua quán lề đường không bill: Gọi báo giá xác nhận với khách trước khi thanh toán.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Hành vi nghiêm cấm</h4>
            <ul>
              <li>Không tự đòi phụ phí leo lầu, mưa gió, tiền xăng nếu chưa được tổng đài duyệt.</li>
              <li>Tuyệt đối không tự ý nâng giá món ăn của quán.</li>
              <li><span class="rule-tag red">Nguyên tắc "Không có lần 2":</span> Gian lận tiền bạc vi phạm 1 lần là <b>ngưng hợp tác vĩnh viễn</b>, không xét duyệt lại!</li>
            </ul>
          </div>
        </div>` },

      { title: 'Không bỏ ca làm việc', html: `
        <div class="quick-summary">⏰ Ca đã đăng ký phải đảm bảo chạy đúng giờ — Có thể tăng ca ngoài giờ khi có thông báo.</div>
        <div class="rule-card dont">
          <h4>❌ Hậu quả khi tự ý bỏ ca</h4>
          <p>Bỏ ca không lý do, không báo trước với điều hành:</p>
          <p>👉 Công ty xử lý theo diện <span class="rule-tag red">Shipper nghỉ ngang & đóng box vĩnh viễn</span> (không hỗ trợ bất kỳ quyền lợi nào về sau).</p>
        </div>` },

      { title: 'Thái độ với khách & Cửa hàng', html: `
        <div class="quick-summary">😊 Luôn giữ thái độ lịch sự, nhã nhặn — Bạn là đại diện thương hiệu Citiship.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Chuẩn mực dịch vụ</h4>
            <ul>
              <li>Giao tiếp nhã nhặn, tôn trọng khách hàng và nhân viên quán/shop.</li>
              <li>Có vấn đề khó khăn: Giữ bình tĩnh và liên hệ Tổng đài hỗ trợ can thiệp.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài vi phạm</h4>
            <p>Bị khách hàng hoặc chủ quán khiếu nại (complaint) về thái độ gay gắt, chửi thề hoặc thu sai phí ship:</p>
            <p><span class="rule-tag red">Công ty xem xét ngưng hợp tác</span> tùy mức độ vi phạm.</p>
          </div>
        </div>` },

      { title: 'Không treo đơn & Không treo giờ đứng xa', html: `
        <div class="quick-summary">📍 Bấm báo xong và thả location ngay khi giao xong — Không đứng xa chờ hết ca để treo giờ.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Thao tác chuẩn</h4>
            <ul>
              <li><b>Xong đơn:</b> Bấm báo xong và thả vị trí ngay (có thể di chuyển đến điểm đợi khác rồi thả lại location).</li>
              <li><b>Đợi đơn quá 15 - 20 phút:</b> Nếu đợi 1 chỗ quá lâu không có đơn, phải <b>chủ động di chuyển vào trung tâm</b> để đón đơn hoặc mở box chung giật đơn.</li>
              <li><b>Có việc bận riêng:</b> Chủ động xin off để hết ca (<code>/vt off</code>), khi nào giải quyết xong việc thì xin vào ca lại, không treo máy.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>❌ Chế tài nghiêm cấm</h4>
            <ul>
              <li><b>Tuyệt đối không treo giờ:</b> Cấm hành vi đứng ở một vị trí xa không có đơn mà cũng không chịu giật đơn để "treo giờ" ăn giờ chạy ca.</li>
              <li><b>Treo đơn (ngâm đơn):</b> Lần đầu <span class="rule-tag red">Xóa giờ toàn bộ ca làm</span>; Tái diễn <span class="rule-tag red">Ngừng hợp tác ngay</span>.</li>
            </ul>
          </div>
        </div>` }
    ] },
  { id: 'quy-trinh', icon: '📋', tone: 'o', title: 'Quy trình xử lý đơn', summary: 'Đơn giao hàng, đơn mua hàng, cảnh báo lừa đảo',
    steps: [
      { title: 'Tổng quan Quy trình xử lý đơn', html: `
        <div class="quick-summary">📋 Nắm vững quy trình chuẩn để đi đơn an toàn, nhanh chóng và không bị boom hàng.</div>
        <div class="rule-card do" style="margin-bottom: 14px;">
          <h4>💡 3 Lưu ý quan trọng của Shipper Citiship:</h4>
          <ul>
            <li><b>1.</b> Luôn kiểm tra kỹ thông tin đơn và gọi xác nhận trước khi rời shop / mua hàng.</li>
            <li><b>2.</b> Có trục trặc (không gọi được, sai địa chỉ): <b>Tag ngay @citiship_cantho</b>.</li>
            <li><b>3.</b> Cập nhật trạng thái và tải ảnh bằng chứng đúng quy trình trên app.</li>
          </ul>
        </div>
        <h3>Các nội dung chính trong mục này:</h3>
        <ol>
          <li><b>Quy trình xử lý Đơn giao hàng</b> (6 bước + Xử lý sự cố thường gặp).</li>
          <li><b>Quy trình xử lý Đơn mua hàng</b> (6 bước + Xử lý sự cố thường gặp).</li>
          <li><b>Cảnh báo ứng tiền hàng & 8 chiêu trò lừa đảo thường gặp</b>.</li>
          <li><b>Xử lý phát sinh cước & Đơn xa (> 2km)</b>.</li>
        </ol>` },

      { title: '1. Quy trình xử lý Đơn giao hàng', html: `
        <div class="quick-summary">🎁 Đơn nhận hàng từ Shop mang giao cho Khách nhận.</div>
        <div class="delivery-journey">
          <div class="journey-step active">
            <div class="journey-icon">🏪</div>
            <div class="journey-label">1. Lấy hàng<br><small style="color:var(--muted)">Shop/Kho</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">📞</div>
            <div class="journey-label">2. Gọi khách<br><small style="color:#b45a00">Bắt buộc</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">🛵</div>
            <div class="journey-label">3. Đi giao<br><small style="color:var(--muted)">Đến nơi</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">🏡</div>
            <div class="journey-label">4. Xong đơn<br><small style="color:#15803d">Thu tiền</small></div>
          </div>
        </div>
        <div class="rule-card do" style="margin-bottom: 16px;">
          <h4>✔️ 6 Bước thực hiện chuẩn:</h4>
          <ol>
            <li><b>Bước 1 - Nhận đơn (Bấm ngay):</b> Bấm "Nhận đơn" trên app ngay khi được gán đơn (trong vòng 5 - 7 phút). Quá 5 - 7 phút không nhận hệ thống sẽ tự động back đơn về.</li>
            <li><b>Bước 2 - Di chuyển lấy hàng:</b> Đến địa chỉ shop/người gửi theo thông tin trên đơn.</li>
            <li><b>Bước 3 - Gọi xác nhận (BẮT BUỘC):</b> Gọi cho người nhận chốt địa chỉ & số tiền thu hộ <b>TRƯỚC KHI RỜI SHOP</b> (chụp log cuộc gọi).</li>
            <li><b>Bước 4 - Chụp hình & Kiểm tra:</b> Chụp gói hàng tại shop (hàng hở chụp rõ bên trong), tải ảnh hàng + ảnh log cuộc gọi lên hệ thống.</li>
            <li><b>Bước 5 - Di chuyển giao hàng:</b> Đến điểm nhận theo thông tin đã xác nhận.</li>
            <li><b>Bước 6 - Hoàn thành:</b> Giao hàng, thu tiền, bấm xong đơn và thả location mới.</li>
          </ol>
        </div>
        <h3>Sự cố thường gặp & Cách xử lý chuẩn:</h3>
        <table>
          <tr><th>Tình huống sự cố</th><th>Cách xử lý chuẩn</th></tr>
          <tr>
            <td>Shop phát sinh nhờ giao thêm đơn ngoài app?</td>
            <td><b>Bắt buộc báo về Tổng đài</b> để kiểm tra xem đơn đó đã có shipper nào qua nhận chưa. Tuyệt đối không tự ý lấy đi luôn để tránh tình trạng 2 bạn cùng qua mà bạn tới trước lấy mất đơn của bạn tới sau!</td>
          </tr>
          <tr>
            <td>Không tìm được địa chỉ lấy hàng?</td>
            <td>Gọi số đặt đơn hỏi vị trí, hoặc tag Tổng đài hỗ trợ.</td>
          </tr>
          <tr>
            <td>Không gọi được người đặt đơn?</td>
            <td>Tag ngay Tổng đài để được hỗ trợ liên hệ.</td>
          </tr>
          <tr>
            <td>Không gọi được người nhận?</td>
            <td>Báo shop nhờ hỗ trợ. Nếu vẫn không được: Tag Tổng đài hỗ trợ hủy đơn.</td>
          </tr>
          <tr>
            <td>Đến nơi giao khách không nghe máy (đã gọi trước lúc ở shop)?</td>
            <td>Báo shop nhờ hỗ trợ. Nếu vẫn không được: <b>Mang hàng trả về cho shop, VẪN ĐƯỢC THU PHÍ SHIP TỪ SHOP</b>.</td>
          </tr>
        </table>` },

      { title: '2. Quy trình xử lý Đơn mua hàng', html: `
        <div class="quick-summary">🍜 Đơn shipper tự mua hộ món ăn / đồ uống theo yêu cầu của khách.</div>
        <div class="delivery-journey">
          <div class="journey-step active">
            <div class="journey-icon">🍜</div>
            <div class="journey-label">1. Đến quán<br><small style="color:var(--muted)">Kiểm tra món</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">📞</div>
            <div class="journey-label">2. Gọi khách<br><small style="color:#b45a00">Món & địa chỉ giao</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">🧾</div>
            <div class="journey-label">3. Chụp bill<br><small style="color:var(--muted)">Biển hiệu+bill</small></div>
          </div>
          <div class="journey-arrow">➜</div>
          <div class="journey-step active">
            <div class="journey-icon">🏡</div>
            <div class="journey-label">4. Giao tận tay<br><small style="color:#15803d">Thu tiền hàng+ship</small></div>
          </div>
        </div>
        <div class="rule-card do" style="margin-bottom: 16px;">
          <h4>✔️ 6 Bước thực hiện chuẩn:</h4>
          <ol>
            <li><b>Bước 1 - Nhận đơn (Bấm ngay):</b> Bấm "Nhận đơn" trên app trong vòng 5 - 7 phút để nhận đơn.</li>
            <li><b>Bước 2 - Di chuyển đến quán:</b> Đến đúng quán/shop theo thông tin đơn hàng.</li>
            <li><b>Bước 3 - Gọi xác nhận khách (BẮT BUỘC):</b> Gọi khách để <b>xác nhận chi tiết món ăn</b> (tên món, số lượng, yêu cầu ghi chú) và <b>xác nhận chính xác địa chỉ giao hàng TRƯỚC KHI MUA HÀNG</b> (chụp lưu log cuộc gọi).</li>
            <li><b>Bước 4 - Chụp hình & Kiểm tra:</b> Chụp <b>BIỂN HIỆU QUÁN</b> + Hóa đơn, kiểm tra đúng món, tải ảnh + ảnh log cuộc gọi lên hệ thống.</li>
            <li><b>Bước 5 - Di chuyển giao hàng:</b> Mang đồ đến đúng địa chỉ người nhận đã xác nhận.</li>
            <li><b>Bước 6 - Hoàn tất:</b> Giao hàng tận tay khách, thu tiền hàng + tiền ship, bấm hoàn tất và thả vị trí mới.</li>
          </ol>
        </div>
        <div class="rule-card warn" style="margin-bottom: 16px;">
          <h4>⚠️ LƯU Ý QUAN TRỌNG VỚI ĐƠN MUA HÀNG:</h4>
          <p>Bắt buộc phải gọi điện thoại xác nhận đủ cả 2 mục: <b>MÓN ĂN & ĐỊA CHỈ GIAO</b> trước khi bỏ tiền mua hàng. Tuyệt đối không tự ý mua đồ khi chưa liên hệ được khách. Nếu không gọi trước mà phát sinh sai sót, đổi món hoặc bị boom hàng thì <b>công ty từ chối hỗ trợ bồi hoàn 100%</b>!</p>
        </div>
        <h3>Sự cố thường gặp & Cách xử lý:</h3>
        <table>
          <tr><th>Tình huống sự cố</th><th>Cách xử lý chuẩn</th></tr>
          <tr>
            <td>Quán nhờ giao thêm đơn khác phát sinh?</td>
            <td><b>Báo ngay cho Tổng đài</b> kiểm tra trước khi nhận để tránh lấy nhầm đơn hệ thống đã điều phối cho bạn khác đang qua lấy.</td>
          </tr>
          <tr>
            <td>Quán hết món / không có hàng?</td>
            <td>Gọi khách xin đổi món hoặc đưa điện thoại cho khách trao đổi trực tiếp với quán.</td>
          </tr>
          <tr>
            <td>Không tìm thấy quán hoặc không gọi được khách?</td>
            <td>Tag ngay bộ phận Tổng đài để hỗ trợ liên hệ giải quyết.</td>
          </tr>
          <tr>
            <td>Đã xác nhận đầy đủ nhưng giao đến nơi khách không nghe máy?</td>
            <td>Tag ngay Tổng đài <code>@citiship_cantho</code> để hỗ trợ xử lý phương án bồi hoàn.</td>
          </tr>
        </table>` },

      { title: '3. Cảnh báo ứng tiền hàng (8 Chiêu lừa đảo)', html: `
        <div class="quick-summary">⚠️ CẢNH BÁO LỪA ĐẢO: Kiểm tra kỹ hàng hóa trước khi ứng tiền — Bất thường báo ngay Tổng đài!</div>
        <div class="rule-card dont" style="margin-bottom: 16px;">
          <h4>🚨 8 DẤU HIỆU LỪA ĐẢO THƯỜNG GẶP PHẢI CẢNH GIÁC:</h4>
          <ol>
            <li><b>1. Nhờ nạp tiền trước:</b> Nhờ shipper nạp tiền vào ví điện tử (Momo, ZaloPay...) qua SĐT rồi hứa trả sau → <b>LỪA ĐẢO 100%</b>.</li>
            <li><b>2. Gửi Bill giả:</b> Gửi ảnh chụp bill chuyển khoản thành công nhưng tài khoản shipper chưa nhận được tiền → <b>KHÔNG TIN BILL ẢNH</b>.</li>
            <li><b>3. Địa điểm giao dịch mập mờ:</b> Hẹn ngoài đường, quán nước vỉa hè, khách sạn, không có địa chỉ nhà cụ thể.</li>
            <li><b>4. Người nhận có dấu hiệu lạ:</b> Hỏi không nhớ địa chỉ, ấp úng, hoặc gọi trên 5 cuộc không nghe máy.</li>
            <li><b>5. Số điện thoại bất thường:</b> SĐT người gửi và người nhận giống nhau hoặc dùng số lạ liên hệ ngoài đơn.</li>
            <li><b>6. Hối thúc dồn dập:</b> Tạo tâm lý gấp gáp <i>"anh lấy nhanh giúp em, khách đang chờ"</i> để bạn mất cảnh giác.</li>
            <li><b>7. Nhiều shipper cùng đến lấy:</b> Đến điểm lấy thấy nhiều shipper khác cùng nhận đơn ứng tiền tương tự.</li>
            <li><b>8. Hàng không tương xứng tiền ứng:</b> Ứng 500k nhưng trong bọc chỉ là quần áo cũ rách, tài liệu, sim rác... Hoặc khách đi xe ôm xin mượn tiền mặt.</li>
          </ol>
        </div>
        <div class="rule-card warn">
          <h4>⚠️ HÀNH ĐỘNG BẮT BUỘC:</h4>
          <p>Gặp bất kỳ dấu hiệu bất thường nào ở trên: <b>TAG NGAY @citiship_cantho ĐỂ ĐƯỢC HỖ TRỢ!</b></p>
          <small>Nếu shipper vẫn cố tình tự ý ứng tiền khi gặp các dấu hiệu trên, shipper sẽ tự chịu rủi ro!</small>
        </div>` },

      { title: '4. Xử lý phát sinh & Đơn xa (> 2km)', html: `
        <div class="quick-summary">📏 Quy định back đơn hợp lệ & Báo cước phát sinh chuẩn xác.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Điều kiện hỗ trợ back đơn</h4>
            <ul>
              <li>Hệ thống ưu tiên gán đơn bán kính 2km. Chỉ hỗ trợ back đơn về khi: <b>Đơn xa hơn 2km</b> hoặc <b>có 1 lý do chính đáng</b>.</li>
              <li><b>Nếu đã lỡ di chuyển:</b> Nếu đơn đã bắn cho shipper mà bạn đã lỡ di chuyển đến nơi khác thì <b>chụp ảnh Timestamp liền ngay lúc đó rồi gửi cho Tổng đài</b>, Tổng đài mới hỗ trợ back đơn về.</li>
            </ul>
          </div>
          <div class="rule-card dont">
            <h4>🚫 CẤM KỴ: LỰA ĐƠN, CHỌN ĐƠN</h4>
            <ul>
              <li><span class="rule-tag red">Tuyệt đối nghiêm cấm:</span> Mọi hành vi kén cá chọn canh, lựa đơn, chê đơn ngắn / đơn dài hoặc viện cớ để né đơn.</li>
              <li>Vi phạm: Bị xử lý nghiêm theo <span class="rule-tag red">chế tài thái độ / ngưng hợp tác vĩnh viễn</span>.</li>
            </ul>
          </div>
        </div>
        <div class="rule-card dont" style="margin-top: 14px;">
          <h4>❌ Đơn hàng "Ship báo sau"</h4>
          <p>Tất cả đơn ship báo sau: <b>Phải tag Tổng đài báo phí</b>, không tự ý thu khách. Tự ý thu thấp hơn phí công ty thì <span class="rule-tag red">shipper tự bù</span>!</p>
        </div>
        <h3>2 Bước xin báo phí hàng nặng, cồng kềnh:</h3>
        <div class="rule-card warn">
          <ol>
            <li><b>Bước 1:</b> Nhận hàng, chụp ảnh hàng để trên xe hoặc để gang tay vào chụp kèm báo địa chỉ giao.</li>
            <li><b>Bước 2:</b> Ước lượng cân nặng báo kèm với ảnh <i>(Ví dụ: hàng tầm 15kg, 25kg...)</i>.</li>
          </ol>
          <p>👉 Tổng đài sẽ căn cứ vào ảnh và khối lượng để duyệt cộng thêm cước phí hợp lý.</p>
        </div>

        <h3>📍 Cách lấy link Google Maps báo phí:</h3>
        <div class="rule-card do">
          <ol>
            <li><b>1.</b> Mở Google Maps, tìm/chọn vị trí cần giao hàng.</li>
            <li><b>2.</b> Bấm biểu tượng <b>Chia sẻ</b> (📤).</li>
            <li><b>3.</b> Bấm chọn <b>"Sao chép"</b> link.</li>
            <li><b>4.</b> Dán link gửi cho Tổng đài tính phí chính xác <i>(xem hướng dẫn có hình minh họa tại mục Hướng dẫn thao tác app)</i>.</li>
          </ol>
        </div>` }
    ] },
  { id: 'huong-dan-app', icon: '📱', tone: 'b', title: 'Hướng dẫn thao tác', summary: 'Cách dùng app',
    steps: [
      { title: '1. Thao tác Vào ca', html: `
        <div class="quick-summary">⏰ Đến ca làm việc đã đăng ký, chuẩn bị đầy đủ thiết bị và bấm Bắt đầu ca trên tab Home.</div>
        
        <h3>2 kênh vào ca của Citiship:</h3>
        <div class="rule-grid" style="margin-bottom: 14px;">
          <div class="rule-card do">
            <h4>📱 Kênh chuẩn (Trên App)</h4>
            <p>Đến giờ ca, mở app bấm nút <b>"Bắt đầu ca"</b> trên tab Home và hoàn tất 3 bước xác nhận bên dưới.</p>
          </div>
          <div class="rule-card warn">
            <h4>💬 Kênh Telegram (Báo xin vào ca trễ)</h4>
            <p>Trường hợp xin vào trễ có duyệt trước: Chụp ảnh Timestamp gửi kèm lệnh <code>/vaoca [vị_trí] [số_tiền]</code> và tag Tổng đài.</p>
          </div>
        </div>

        <h3>✅ Checklist kiểm tra trước khi bấm Vào ca:</h3>
        <div class="rule-card do" style="margin-bottom: 14px;">
          <ul>
            <li>🔋 <b>Pin điện thoại:</b> Đảm bảo trên 80% (khuyến khích luôn mang theo <b>sạc dự phòng</b>).</li>
            <li>📶 <b>Mạng 4G/5G & Định vị GPS:</b> Bật sẵn dữ liệu di động tốc độ cao và bật vị trí chính xác cao.</li>
            <li>🎒 <b>Dụng cụ đi ca:</b> Đủ 4 món (nón bảo hiểm phụ, 3 dây ràng, áo mưa, túi giữ nhiệt/chống nước).</li>
            <li>💵 <b>Tiền mặt ứng hàng:</b> Chuẩn bị sẵn tiền lẻ để thối và đủ tiền mặt theo hạn mức đăng ký.</li>
            <li>👕 <b>Tác phong:</b> Mặc đồng phục Citiship và mặc quần dài lịch sự.</li>
          </ul>
        </div>

        <figure>
          <img src="images/app-bat-dau-ca.png" alt="Bấm Bắt đầu ca trên tab Home">
          <figcaption>1. Nhấn nút "Bắt đầu ca" màu xanh trên màn hình chính.</figcaption>
        </figure>
        <h3>3 bước hoàn tất để vào ca:</h3>
        <figure>
          <img src="images/app-thao-tac-vao-ca.png" alt="3 bước vào ca">
          <figcaption>Giao diện vào ca: cần hoàn thành đủ 3 mục.</figcaption>
        </figure>
        <ol>
          <li><b>Ảnh vào ca:</b> Dùng app Timestamp Camera chụp selfie rõ mặt, chọn ảnh vừa chụp tải lên hệ thống.</li>
          <li><b>Tiền ứng hàng (trên app ghi là "Tiền ship hiện có"):</b> Nhập chính xác số tiền mặt thực tế bạn đang mang theo để hệ thống định mức ứng tiền khi nhận đơn.</li>
          <li><b>Xác nhận Vào ca:</b> Sau khi hoàn thành đủ 3 mục (Ảnh selfie, Tiền ship và Vị trí hiện tại), nút <b>Vào ca</b> ở cuối màn hình sẽ sáng lên để bấm xác nhận hoàn tất.</li>
        </ol>
        
        <div class="note">
          📡 <b>Hỗ trợ khi gặp sự cố Mất mạng / Lỗi GPS:</b><br>
          Nếu đang trong ca mà điện thoại bị mất sóng mạng tạm thời hoặc GPS bị gián đoạn, app sẽ cho phép lưu offline và ghi nhận log hệ thống. <b>Công ty không tự động phạt</b> nếu shipper có bằng chứng xác minh sự cố khách quan!
        </div>` },

      { title: '2. Báo vị trí (Định vị)', html: `
        <div class="note">
          <b>Bắt buộc:</b> Bấm báo vị trí sau khi vừa vào ca, vừa xong đơn hoặc khi di chuyển sang khu vực chờ khác để hệ thống gán đơn gần nhất (bán kính 2km).<br>
          ⚠️ <b>Vị trí vào ca:</b> Bắt buộc phải thả vị trí vào khu vực nội ô mới vào ca. Nếu vào ca ngoài nội ô mà quá 15 phút không di chuyển vào nội ô thì sẽ bị Bot tự động kick khỏi ca!
        </div>
        <h3>Cách mở bản đồ vị trí</h3>
        <p>Bấm vào <b>icon hình tròn bản đồ màu xanh</b> đang nổi ở góc phải màn hình ứng dụng.</p>
        <figure>
          <img src="images/app-nut-noi-ban-do.png" alt="Nút tròn bản đồ nổi trên màn hình">
          <figcaption>Icon bản đồ nổi góc phải: bấm để mở bản đồ định vị.</figcaption>
        </figure>
        <h3>Xác nhận và gửi tọa độ</h3>
        <figure>
          <img src="images/app-bam-bao-vi-tri.png" alt="Bấm Báo vị trí trên bản đồ">
          <figcaption>Kiểm tra chấm xanh và bấm nút "Báo vị trí".</figcaption>
        </figure>
        <ol>
          <li><b>Kiểm tra chấm định vị:</b> Quan sát chấm xanh trên bản đồ xem đã bắt đúng vị trí thực tế của bạn đang đứng hay chưa.</li>
          <li><b>Bấm Báo vị trí:</b> Nhấn nút xanh <b>Báo vị trí</b> ở góc dưới màn hình để cập nhật định vị thực tế về hệ thống cho Tổng đài.</li>
        </ol>` },

      { title: '3. Box Chung (Giật đơn)', html: `
        <p>Khi đơn hàng không có shipper nào đứng trong phạm vi 2km, hệ thống sẽ tự động bắn đơn lên <b>Box Chung</b> (hoặc thỉnh thoảng hệ thống tự random bắn đơn ngẫu nhiên).</p>
        <figure>
          <img src="images/app-box-chung-cho-20s.png" alt="Giao diện Box Chung đếm ngược 20s">
          <figcaption>Box Chung: Chờ 20s xem thông tin trước khi giật đơn.</figcaption>
        </figure>
        <h3>Quy trình lấy đơn Box Chung</h3>
        <ol>
          <li>Vào tab <b>Box Chung</b> ở thanh menu dưới cùng.</li>
          <li><b>Đếm ngược 20 giây:</b> Mỗi đơn mới lên hệ thống sẽ hiển thị đồng hồ đếm ngược 20 giây để tất cả shipper có thời gian đọc kỹ thông tin điểm lấy, điểm giao và cước phí trước khi nhận.</li>
          <li><b>Kéo nhận đơn:</b> Ngay khi kết thúc 20 giây đếm ngược, nút nhận đơn sẽ mở ra để bạn <b>kéo thanh trượt sang phải</b> giật đơn.</li>
          <li><b>Hỗ trợ xin đơn chưa có người nhận:</b> Nếu sau 20 giây mà đơn trên Box Chung vẫn chưa có tài xế nào nhận, bạn có thể nhắn tin vào mục Chat để nhờ Tổng đài điều phối trực tiếp đơn đó cho mình.</li>
        </ol>
        <div class="note"><b>Lưu ý:</b> Shipper thử việc (tuần đầu tiên) không được giật đơn box chung!</div>` },

      { title: '4. Nhận đơn & Xử lý đơn phát sinh', html: `
        <div class="rule-card warn" style="margin-bottom: 14px;">
          <h4>⏱️ Bắt buộc bấm nhận đơn liền (trong 5 - 7 phút):</h4>
          <p>Khi được hệ thống bắn đơn hoặc giật đơn box chung thành công, shipper phải <b>bấm NHẬN ĐƠN liền</b>. Nếu quá <b>5 - 7 phút</b> không bấm nhận đơn, hệ thống sẽ tự động back đơn về và điều phối cho bạn khác (Tổng đài sẽ không giải quyết lại nếu đơn đã bắn cho người khác).</p>
        </div>
        <p>Khi hệ thống phân bổ đơn tới máy, kiểm tra nhanh thông tin đơn hàng và bấm nút xanh <b>NHẬN ĐƠN</b>.</p>
        <figure>
          <img src="images/app-nhan-don.png" alt="Nhận đơn và Cập nhật phí ship">
          <figcaption>Màn hình nhận đơn và xử lý đơn xa/phát sinh cước.</figcaption>
        </figure>
        <h3>Xử lý đơn xa & thay đổi cước:</h3>
        <ul>
          <li><b>Đơn xa (> 2km):</b> Nếu điểm lấy hàng thực tế cách trên 2km do sai lệch định vị, nhắn ngay cho Tổng đài xin back đơn để điều phối bạn khác gần hơn.</li>
          <li><b>Đơn báo sau / Có phát sinh phí:</b> (Hàng nặng cồng kềnh, đổi địa chỉ nhận...), shipper nhấn <b>CẬP NHẬT PHÍ SHIP</b> hoặc liên hệ Tổng đài để báo phí chính xác. Tuyệt đối không tự ý báo giá ngoài với khách.</li>
        </ul>
        <div class="note">
          <b>LƯU Ý ĐƠN "SHIP BÁO SAU":</b><br>
          Tất cả các đơn "ship báo sau" shipper <b>phải tag Tổng đài để Tổng đài báo phí</b>, không được tự ý tính phí thu khách.<br>
          <b>Đơn nào tự ý tính phí nếu thấp hơn phí của công ty thì shipper tự bù!</b>
        </div>
        <h3>2 bước để được báo phí hàng nặng, cồng kềnh:</h3>
        <ol>
          <li><b>Bước 1:</b> Shipper nhận hàng, chụp hình hàng lúc để trên xe hoặc để gang tay vào chụp kèm báo địa chỉ giao nếu trên đơn chưa có.</li>
          <li><b>Bước 2:</b> Ước lượng khối lượng thùng hàng rồi báo kèm với hình đã gửi <i>(Ví dụ: hàng khoảng 10kg, 25kg... ước lượng chứ không yêu cầu chính xác 100%)</i>.</li>
        </ol>
        <p>👉 Tổng đài sẽ dựa trên hình ảnh và cân nặng để báo phí chuẩn xác nhất.</p>

        <h3>📍 Hướng dẫn 4 bước lấy link Google Maps báo phí ship:</h3>
        <p>Khi gặp đơn cần Tổng đài đo cước (đơn xa, đổi địa chỉ nhận, đơn chưa có định vị chuẩn...), shipper thao tác lấy link bản đồ theo 4 bước sau:</p>
        <div class="rule-card do">
          <ol>
            <li><b>Bước 1 — Chọn vị trí:</b> Mở app Google Maps, tìm kiếm hoặc chạm chọn đúng vị trí cần giao/lấy hàng.</li>
            <li><b>Bước 2 — Bấm Chia sẻ:</b> Tại thanh thông tin địa điểm ở dưới màn hình, bấm vào biểu tượng <b>Chia sẻ</b> (ô vuông có mũi tên đi lên 📤).</li>
            <li><b>Bước 3 — Bấm Sao chép:</b> Trong bảng tùy chọn hiện lên, nhấn chọn dòng <b>"Sao chép"</b> để copy link bản đồ.</li>
            <li><b>Bước 4 — Gửi Tổng đài:</b> Dán đường link Google Maps vừa sao chép gửi cho Tổng đài để được tính khoảng cách và duyệt phí ship chuẩn xác!</li>
          </ol>
        </div>
        <figure>
          <img src="images/huong-dan-lay-link-map.jpg" alt="Hướng dẫn 4 bước lấy link Google Maps báo phí ship">
          <figcaption>Hướng dẫn 4 bước: Chọn vị trí ➔ Bấm Chia sẻ ➔ Bấm Sao chép ➔ Dán link gửi Tổng đài để báo phí ship.</figcaption>
        </figure>` },

      { title: '5. Chụp & Tải ảnh bằng chứng đơn hàng', html: `
        <p>Đến nơi lấy hàng, bắt buộc phải chụp và tải đầy đủ hình ảnh bằng chứng trước khi rời khỏi quán/shop.</p>
        <figure>
          <img src="images/app-tai-bang-chung.png" alt="Màn hình Tải bằng chứng đơn hàng">
          <figcaption>Bật app chụp và tải ảnh bằng chứng lên hệ thống.</figcaption>
        </figure>
        <h3>Các hình ảnh bắt buộc chụp:</h3>
        <ul>
          <li>Chụp các gói hàng (chụp trực tiếp vào gói hàng / bên trong túi nếu không đóng gói kín).</li>
          <li>Chụp hóa đơn / biên nhận giá trị từng gói hàng.</li>
          <li>Chụp log lịch sử cuộc gọi xác nhận với khách trước khi rời shop/quán.</li>
        </ul>
        <p>Sau khi chọn đủ hình ảnh, bấm nút <b>Gửi hình ảnh</b> ở dưới cùng để hoàn tất lưu bằng chứng.</p>` },

      { title: '6. Hoàn tất đơn & Kiểm tra lịch sử', html: `
        <p>Khi đã giao hàng thành công và thu tiền xong, bấm xác nhận <b>XONG ĐƠN</b> ngay lập tức.</p>
        <figure>
          <img src="images/app-xac-nhan-xong-don.png" alt="Xác nhận xong đơn">
          <figcaption>Xác nhận Xong đơn và tra cứu lịch sử trong ngày tại tab Hoàn thành.</figcaption>
        </figure>
        <ol>
          <li><b>Bấm Xong đơn:</b> Khi popup hiện ra <i>"Bạn có chắc muốn xong đơn...?"</i>, bấm <b>XONG ĐƠN</b> để hệ thống giải phóng ca và ghi nhận doanh thu (tránh bị coi là treo đơn).</li>
          <li><b>Báo lại vị trí:</b> Xong đơn xong, bấm ngay nút nổi bản đồ để Báo vị trí hiện tại.</li>
          <li><b>Kiểm tra lịch sử:</b> Bấm chuyển sang tab <b>Hoàn thành</b> ở thanh trạng thái để kiểm tra danh sách toàn bộ các đơn đã hoàn tất trong ngày.</li>
        </ol>` },

      { title: '7. Nhắn tin hỗ trợ (Chat Tổng đài)', html: `
        <p>Khi gặp trục trặc đơn hàng, cần xin hỗ trợ hoặc trao đổi thông tin với bộ phận điều phối:</p>
        <figure>
          <img src="images/app-chat-ho-tro.png" alt="Mục Chat hỗ trợ trên app">
          <figcaption>Vào mục Chat để liên hệ bộ phận hỗ trợ Tổng đài.</figcaption>
        </figure>
        <ol>
          <li>Bấm vào tab <b>Chat</b> ở thanh menu dưới cùng màn hình.</li>
          <li>Đối với shipper mới chưa có lịch sử trò chuyện: bấm nút tạo chat mới để kết nối và gửi tin nhắn yêu cầu hỗ trợ.</li>
          <li>Nhập nội dung cần hỗ trợ và gửi tin nhắn (hoặc kèm hình ảnh nếu có trục trặc đơn hàng).</li>
        </ol>
        <div class="note">
          <b>🔔 BẮT BUỘC THƯỜNG XUYÊN CHECK PHẦN TIN NHẮN:</b><br>
          Trong suốt ca làm việc, shipper phải thường xuyên vào mục <b>Chat</b> hoặc kiểm tra thông báo để kịp thời tiếp nhận các thông tin, điều phối và chỉ đạo khẩn từ Tổng đài!
        </div>` }
    ] },
  { id: 'tai-khoan', icon: '👤', tone: 'o', title: 'Tài khoản', summary: 'Đăng ký ca, thống kê, công nợ',
    steps: [
      { title: 'Tổng quan Menu Tài khoản', html: `
        <p>Tại tab <b>Tài khoản</b> ở thanh menu dưới cùng, shipper có thể quản lý lịch làm việc, thống kê thu nhập và công nợ đối soát.</p>
        <figure>
          <img src="images/app-menu-tai-khoan.png" alt="Màn hình Menu Tài khoản">
          <figcaption>Giao diện tab Tài khoản gồm 5 mục chức năng chính.</figcaption>
        </figure>
        <h3>5 mục chính trong tab Tài khoản:</h3>
        <ol>
          <li><b>Thống kê hôm nay:</b> Báo cáo chi tiết đơn hàng và doanh thu trong ngày.</li>
          <li><b>Thống kê tuần này:</b> Tổng kết số liệu cả tuần, hiệu suất và tỷ lệ đơn không hình.</li>
          <li><b>Đăng ký ca:</b> Đăng ký các khung giờ làm việc cho tuần tới.</li>
          <li><b>Xem ca đã đăng ký:</b> Rà soát lại lịch làm việc đã lưu hoặc chỉnh sửa ca.</li>
          <li><b>Công nợ / Nợ công:</b> Tạo yêu cầu đối soát và hoàn tiền vào Thứ 2.</li>
        </ol>
        <p><i>Bấm <b>Tiếp →</b> để xem chi tiết hướng dẫn từng mục bên dưới.</i></p>` },

      { title: '1. Thống kê hôm nay', html: `
        <p>Mục <b>Thống kê hôm nay</b> giúp shipper theo dõi và rà soát tức thời hiệu quả công việc trong ngày.</p>
        <figure>
          <img src="images/app-thong-ke-hom-nay.png" alt="Màn hình Thống kê hôm nay">
          <figcaption>Chi tiết giao diện Thống kê hôm nay: Đơn hàng, Doanh thu, Thời gian & Hiệu suất.</figcaption>
        </figure>
        <h3>Nội dung thống kê gồm có:</h3>
        <ul>
          <li><b>Tổng số đơn hoàn thành:</b> Số lượng đơn hàng bạn đã giao thành công trong ngày.</li>
          <li><b>Số đơn đã hủy:</b> Các đơn bị hủy và nguyên nhân (nếu có).</li>
          <li><b>Tổng phí ship:</b> Doanh thu tiền ship kiếm được trong ngày.</li>
          <li><b>Tỷ lệ Không chụp hình:</b> Theo dõi số đơn chụp thiếu ảnh trong ngày.</li>
          <li><b>Thời gian & hiệu suất:</b> Giờ chạy hôm nay, tổng giờ làm cả tuần và mức hiệu suất làm việc.</li>
        </ul>` },

      { title: '2. Thống kê tuần này', html: `
        <p>Mục <b>Thống kê tuần này</b> là cơ sở tổng kết quan trọng để tính toán chiết khấu, thưởng và phạt vào Thứ 2 hàng tuần.</p>
        <figure>
          <img src="images/app-thong-ke-tuan-nay.png" alt="Màn hình Thống kê tuần">
          <figcaption>Giao diện Thống kê tuần: Tổng tuần, Phân tích tuần và Chi tiết theo từng ngày.</figcaption>
        </figure>
        <h3>Nội dung thống kê gồm có:</h3>
        <ul>
          <li><b>Tổng kết cả tuần:</b> Tổng số đơn hoàn thành, đơn hủy, tổng phí ship cả tuần và <b>Tổng giờ làm việc thực tế</b>.
            <br><small style="color:var(--accent); font-weight: 600;">⚠️ Lưu ý: Giờ thực tế dùng để tính bảng chiết khấu Thứ 2 là số giờ đã trừ đi các ca bị xóa do vi phạm quy định.</small>
          </li>
          <li><b>Phân tích hiệu suất trung bình:</b> Đánh giá năng suất hoạt động của bạn trong suốt cả tuần.</li>
          <li><b>Tỷ lệ đơn không chụp hình:</b> Đếm số đơn thiếu ảnh bằng chứng để biết có bị trừ phạt <i>(mỗi 5% đơn không hình tương ứng phạt 1%)</i> hay không.</li>
          <li><b>Bảng chi tiết theo từng ngày chạy:</b> Xem cụ thể phí ship, đơn xong, đơn hủy, giờ làm chi tiết của từng ngày từ Thứ 2 đến Chủ nhật.</li>
        </ul>` },

      { title: '3. Đăng ký ca', html: `
        <p>Đăng ký lịch làm việc hàng tuần trên app để đảm bảo đủ số giờ quy định.</p>
        <figure>
          <img src="images/app-dang-ky-ca-tuan.png" alt="Chọn tuần đăng ký ca">
          <figcaption>1. Chọn đúng tuần làm việc cần đăng ký.</figcaption>
        </figure>
        <div class="note"><b>Lưu ý quan trọng:</b><br>
        - <b>Hạn chót:</b> Thứ 7 & Chủ nhật mỗi tuần (sau 00:00 Thứ 2 hệ thống sẽ tự động khóa).<br>
        - <b>Yêu cầu tối thiểu:</b> Đăng ký ít nhất <b>30 giờ / tuần</b>.<br>
        - Nếu muốn xin off cả tuần sau: <b>bắt buộc báo trước Thứ 5 tuần hiện tại</b>. Không đăng ký và không chạy có thể bị xem xét dừng hợp tác.</div>
        <h3>Các bước thực hiện:</h3>
        <figure>
          <img src="images/app-chon-slot-gio.png" alt="Tick chọn khung giờ">
          <figcaption>2. Tick chọn các khung giờ trong ngày rồi nhấn Lưu ca.</figcaption>
        </figure>
        <ol>
          <li>Chọn chính xác tuần cần đăng ký (ví dụ: Tuần 45).</li>
          <li>Tick chọn các khung giờ muốn chạy trong ngày cho đến hết tuần.</li>
          <li>Nhấn nút cam <b>Lưu ca</b> ở cuối màn hình để xác nhận.</li>
        </ol>` },

      { title: '4. Xem ca đã đăng ký', html: `
        <p>Mục <b>Xem ca đã đăng ký</b> giúp bạn kiểm tra lại toàn bộ lịch ca đã đăng ký cho tuần tới xem đã chính xác chưa.</p>
        <figure>
          <img src="images/app-xem-ca-da-dang-ky.png" alt="Mục Xem ca đã đăng ký">
          <figcaption>Giao diện Xem ca đã đăng ký: kiểm tra các ca làm việc trong tuần.</figcaption>
        </figure>
        <h3>Hướng dẫn kiểm tra & sửa ca:</h3>
        <ul>
          <li>Vào mục <b>Xem ca đã đăng ký</b> để đối chiếu toàn bộ các khung giờ đã chọn cho tuần tới xem đã đủ tối thiểu 30 tiếng chưa.</li>
          <li>Nếu phát hiện sai sót hoặc có nhu cầu đổi giờ, bạn có thể đăng ký lại khi hệ thống còn mở thời hạn (trước 00:00 Thứ 2).</li>
        </ul>` },

      { title: '5. Công nợ / Nợ công', html: `
        <p>Mục <b>Công nợ / Nợ công</b> dùng để tạo yêu cầu đối soát và cấn trừ tiền vào kỳ tính chiết khấu <b>ngày Thứ 2 mỗi tuần</b>:</p>
        <figure>
          <img src="images/app-tao-cong-no.png" alt="Tạo yêu cầu công nợ hoặc nợ công">
          <figcaption>Tạo yêu cầu Công nợ hoặc Nợ công gửi TĐV duyệt trên Telegram.</figcaption>
        </figure>
        <h3>1. Công nợ (Công ty nợ shipper)</h3>
        <ul>
          <li>Áp dụng khi đơn có yêu cầu báo công nợ phí ship: shipper đi giao và <b>tuyệt đối không thu tiền ship của khách</b>.</li>
          <li>Giao xong gõ lệnh <code>/congno</code> trên nhóm hoặc tạo yêu cầu trên app kèm ghi chú rõ tên công ty/shop nợ để được hoàn lại vào kỳ tính chiết khấu Thứ 2.</li>
        </ul>
        <h3>2. Nợ công (Shipper nợ công ty)</h3>
        <ul>
          <li>Lệnh báo số tiền shipper nợ công ty: phát sinh khi shipper bị phạt vi phạm quy chế hoặc nộp chiết khấu trễ hạn (sau 22h ngày Thứ 2).</li>
          <li>Gõ lệnh <code>/nocong [số tiền]k [mô tả]</code> trên nhóm hoặc tạo yêu cầu nợ công trên app, nhập đúng số tiền kèm ghi chú chi tiết lý do bị trừ để tính cấn trừ vào Thứ 2 hàng tuần.</li>
        </ul>` }
    ] },
  { id: 'lenh-telegram', icon: '💬', tone: 'b', title: 'Bảng lệnh', summary: 'Các lệnh dùng với hệ thống và chat bot',
    steps: [
      { title: 'Bảng lệnh hệ thống', html: `
        <div class="note"><b>Lưu ý:</b> Bảng lệnh dưới đây áp dụng cho cả nhóm Telegram và mục <b>Chat</b> trên app Citiship.</div>
        <table>
          <tr><th style="width: 32%; min-width: 105px;">Cú pháp lệnh</th><th>Ý nghĩa & Hướng dẫn sử dụng</th></tr>
          <tr>
            <td class="cmd-cell"><code>/vaoca [vị_trí] [số_tiền]</code></td>
            <td>Dành cho shipper bắt đầu ca làm việc (nhập vị trí và số tiền mặt hiện có).</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/di</code></td>
            <td>Kiểm tra danh sách đơn đang đi hiện tại của shipper.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/phi [mã_đơn] [số_tiền]</code></td>
            <td>
              Cập nhật phí cho đơn hàng.<br>
              <i>Ví dụ:</i> Đơn <code>CT01-120120#0001</code> có phí 20k, shipper gõ: <code>/phi 1 20</code> (mã đơn chỉ lấy 4 số cuối sau dấu #, số 0 ở đầu có thể rút gọn).
            </td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/vt off</code></td>
            <td>Shipper báo kết thúc ca làm việc (hết ca).</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/hetca</code></td>
            <td><i>(Lệnh dành riêng cho Tổng đài)</i> để off ca cho shipper khi cần thiết.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/reset [mã_đơn]</code></td>
            <td><i>(Dành riêng cho Tổng đài)</i> để reset báo lại phí cho đơn đã xong hoặc điều chỉnh báo lại mức phí nhỏ hơn (Ví dụ: <code>/reset 001</code>).</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/thongke</code></td>
            <td>Thống kê nhanh các đơn hàng trong ngày của shipper.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/thongketuan</code></td>
            <td>Thống kê toàn bộ các đơn hàng trong tuần của shipper.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/random</code></td>
            <td>Dùng kèm khi gửi ảnh đối phó check chui: Chụp selfie + ảnh xe (thấy biển số) bằng Timestamp Camera và ghi caption <code>/random</code> gửi vào box trong vòng 10 phút.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/congno</code></td>
            <td>Báo hoàn tất đơn công nợ: Dùng sau khi giao xong đơn không thu tiền ship khách để hệ thống ghi nhận hoàn tiền vào Thứ 2.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/nocong [số_tiền]k [mô_tả]</code></td>
            <td>Lệnh báo số tiền shipper nợ công ty (Ví dụ: <code>/nocong 50k quen trang bi</code>).</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>/thanhtoan [mã_tuần] [số_tiền]k</code></td>
            <td>Báo nộp % chiết khấu tuần: Gửi kèm ảnh biên nhận chuyển khoản vào box đi đơn trước 22h Thứ 2 (Ví dụ: <code>/thanhtoan 364 250k</code>). Dùng tài khoản chính chủ ghi họ tên shipper.</td>
          </tr>
          <tr>
            <td class="cmd-cell"><code>@citiship_cantho</code></td>
            <td>Tag tổng đài hỗ trợ: Dùng khi gặp sự cố boom hàng, đổi địa chỉ, xin back đơn > 2km, xin duyệt vào ca trễ hoặc xin tăng ca.</td>
          </tr>
        </table>` }
    ] },
  { id: 'ho-tro', icon: '❓', tone: 'o', title: 'Hỗ trợ giải đáp thắc mắc', summary: 'Xử lý boom hàng & Liên hệ',
    steps: [
      { title: 'Xử lý đơn sự cố (Boom hàng)', html: `
        <div class="quick-summary">🛡️ CAM KẾT CITISHIP: Không để shipper chịu chi phí khi bị boom hàng nếu đã gọi xác nhận trước!</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>📦 Đối với Đơn Giao Hàng (Shop)</h4>
            <ol>
              <li>Nhận hàng ở shop: <b>Bắt buộc gọi người nhận</b> ngay lúc nhận hàng.</li>
              <li>Đến nơi gọi không được: Báo shop nhờ gọi giúp + <b>Tag ngay @citiship_cantho</b>.</li>
              <li>Vẫn không liên lạc được: <b>Mang hàng trả về cho shop và VẪN ĐƯỢC THU TIỀN SHIP</b> từ shop!</li>
            </ol>
          </div>
          <div class="rule-card do">
            <h4>🍜 Đối với Đơn Mua Hàng (Quán)</h4>
            <ol>
              <li>Đến quán: Gọi khách xác nhận món, giá tiền, địa chỉ <b>TRƯỚC KHI MUA</b>.</li>
              <li>Mua đúng món và đúng ghi chú của khách (không ớt, không hành...).</li>
              <li>Đến nơi không liên lạc được: <b>Tag ngay @citiship_cantho</b> để tổng đài can thiệp xử lý bồi hoàn.</li>
            </ol>
          </div>
        </div>
        <div class="rule-card dont">
          <h4>❌ LƯU Ý QUAN TRỌNG:</h4>
          <p>Nếu shipper <b>KHÔNG gọi xác nhận trước</b> với người nhận theo quy trình, công ty sẽ <span class="rule-tag red">từ chối hỗ trợ bồi hoàn 100%</span>!</p>
        </div>` },

      { title: 'Quy chế thắc mắc & Khiếu nại', html: `
        <div class="quick-summary">⚖️ Nguyên tắc công bằng: Sửa hành vi & bảo vệ vận hành — Không gộp mọi lỗi thành gian lận, không phạt chồng chéo!</div>
        
        <h3>📊 Ma trận xử lý vi phạm công bằng:</h3>
        <table>
          <tr><th>Nhóm lỗi</th><th>Hành vi vi phạm ví dụ</th><th>Hướng xử lý đề xuất</th><th>Bằng chứng bắt buộc</th></tr>
          <tr>
            <td><b>Chưa thành thạo</b></td>
            <td>Quên 1 ảnh, nhập sai lệnh lần đầu</td>
            <td>Nhắc nhở + hướng dẫn học lại đúng bài</td>
            <td>Log hệ thống</td>
          </tr>
          <tr>
            <td><b>Lặp lại quy trình</b></td>
            <td>Thiếu ảnh nhiều lần, ngâm đơn / treo đơn</td>
            <td>Cảnh báo + tạm hạn chế nhận đơn + tái kiểm tra</td>
            <td>Tần suất & lịch sử vi phạm</td>
          </tr>
          <tr class="row-orange">
            <td><b>Gian lận có chủ ý</b></td>
            <td>Kê giá, tạo đơn ảo, dùng hộ tài khoản</td>
            <td>Tạm khóa, điều tra, có thể ngưng hợp tác</td>
            <td>Ảnh, log, đối soát, biên bản giải trình</td>
          </tr>
          <tr class="row-blue">
            <td><b>Sự cố hệ thống</b></td>
            <td>App lỗi, GPS định vị sai, mất sóng mạng</td>
            <td><span class="rule-tag green">Không phạt khi có bằng chứng</span></td>
            <td>Mã lỗi hệ thống / ảnh chụp màn hình</td>
          </tr>
          <tr class="row-green">
            <td><b>Bất khả kháng</b></td>
            <td>Tai nạn giao thông, thời tiết nguy hiểm</td>
            <td>Ưu tiên an toàn bản thân, hỗ trợ xử lý riêng</td>
            <td>Biên bản / xác minh thực tế</td>
          </tr>
        </table>

        <div class="rule-card warn" style="margin: 16px 0;">
          <h4>🛡️ QUY TRÌNH RA QUYẾT ĐỊNH XỬ LÝ MINH BẠCH:</h4>
          <ul>
            <li>Mỗi quyết định xử phạt bắt buộc phải có: <b>Mã lỗi, bằng chứng cụ thể, người duyệt, mức xử lý, thời hạn và quyền giải trình của shipper</b>.</li>
            <li><b>Bảo vệ đối tác:</b> Khiếu nại một phía của khách hàng hoặc quán <b>không được coi là căn cứ duy nhất</b> để chấm dứt hợp tác (phải đối chiếu log cuộc gọi, hình ảnh bằng chứng của shipper).</li>
          </ul>
        </div>

        <div class="rule-grid">
          <div class="rule-card do">
            <h4>✔️ Nắm rõ quy định & Trao đổi khi cần</h4>
            <p>Nội quy, quy trình cốt lõi cần chủ động đọc kỹ khi nhận việc. Trong quá trình chạy đơn, nếu có bất kỳ thắc mắc phát sinh về bảng kê chiết khấu, đơn hàng hay chế tài: Hãy nhắn ngay cho Tổng đài qua <b>mục Chat trên App</b> để được giải đáp.</p>
          </div>
          <div class="rule-card dont">
            <h4>❌ Khi phát sinh vi phạm</h4>
            <p>Trường hợp vi phạm các Quy Tắc Đỏ và giải thích do <i>"không nắm rõ"</i> hoặc <i>"chưa đọc kỹ"</i>:</p>
            <ul>
              <li>Shipper sẽ phải chịu trách nhiệm theo đúng quy định đã ban hành.</li>
              <li>Không chấp nhận lý do <i>"không biết"</i> với các quy định đã được training đầy đủ.</li>
            </ul>
          </div>
        </div>

        <h3>⚖️ Quy trình khiếu nại minh bạch khi bị phạt sai:</h3>
        <div class="rule-card do" style="margin-bottom: 16px;">
          <ul>
            <li><b>Kênh tiếp nhận khiếu nại:</b> Nhắn tin trực tiếp tại <b>mục Chat trên App Citiship</b> (khung giờ trực: <b>7h00 - 22h00</b> hàng ngày).</li>
            <li><b>Thông tin cung cấp:</b> Mã đơn hàng, ngày/ca bị phạt, hình ảnh bằng chứng đối soát (ảnh Timestamp, log cuộc gọi, ảnh lỗi mạng/GPS) và lý do giải trình.</li>
            <li><b>Thời hạn phản hồi:</b> Tổng đài sẽ kiểm tra dữ liệu hệ thống và phản hồi kết quả trong vòng <b>24h - 48h</b>. Nếu xác định lỗi do hệ thống hoặc nguyên nhân khách quan, công ty sẽ hủy phạt và hoàn trả 100% nợ công vào kỳ đối soát tiếp theo.</li>
          </ul>
        </div>` },

      { title: 'Kênh liên hệ hỗ trợ chính thức', html: `
        <div class="quick-summary">📞 Các kênh hỗ trợ chính thức dành cho đối tác tài xế Citiship.</div>
        <div class="rule-grid">
          <div class="rule-card do">
            <h4>📱 Mục Chat trên app (Kênh chính)</h4>
            <p>Bấm vào tab <b>Chat</b> ở góc dưới màn hình app để trao đổi trực tiếp với Tổng đài viên (Hoạt động từ <b>7h00 - 22h00</b> hàng ngày) để giải quyết mọi sự cố, khiếu nại và cước phí.</p>
          </div>
          <div class="rule-card do">
            <h4>💬 Tag Tổng đài sự cố Telegram</h4>
            <p>Tag <code>@citiship_cantho</code> trên Telegram khi gặp đơn boom hàng khẩn cấp hoặc cần duyệt lệnh ca.</p>
          </div>
          <div class="rule-card do">
            <h4>👥 Group Anh Em Shipper</h4>
            <p>Hỗ trợ giao lưu, hỏi đường, chia sẻ kinh nghiệm đi ca (Được duyệt thêm vào nhóm sau khi hoàn tất hồ sơ).</p>
          </div>
          <div class="rule-card do">
            <h4>📢 Kênh Thông Báo Tổng</h4>
            <p>Kênh cập nhật thông báo nội bộ, ca trống, thưởng cao điểm và lịch tăng ca.</p>
          </div>
        </div>` }
    ] }
];

// Bộ đề làm bài test kiến thức dành cho Shipper Mới (26 câu trắc nghiệm bám sát 8 mục, gồm 10 Quy Tắc Đỏ bắt buộc 100%)
const EXAM_QUESTIONS = [
  {
    id: 1,
    category: 'Mục 1: Chính sách & Chiết khấu',
    isRed: false,
    question: 'Quy trình chuẩn để nhận lại đủ 100% tiền ký quỹ (500.000đ) khi chấm dứt hợp tác (nghỉ việc) là gì?',
    options: [
      'A. Báo trước 1 tuần cho Quản lý, chạy tiếp trọn vẹn tuần kế tiếp theo bảng ca đã đăng ký và nộp đủ chiết khấu tuần cuối.',
      'B. Nhắn tin xin nghỉ trước 1 ngày qua chat app và nộp tiền chiết khấu còn nợ.',
      'C. Nghỉ việc bất kỳ lúc nào cũng được hoàn trả cọc ngay trong ngày.'
    ],
    answer: 0,
    explanation: 'Shipper cần báo trước 1 tuần, chạy trọn vẹn tuần tiếp theo theo bảng ca đã đăng ký và nộp đủ hóa đơn chiết khấu tuần cuối để được hoàn 100% ký quỹ.'
  },
  {
    id: 2,
    category: 'Mục 1: Chính sách & Chiết khấu',
    isRed: false,
    question: '"Giờ chạy thực tế" trong tuần dùng để xét bậc % nộp về công ty được tính thế nào?',
    options: [
      'A. Là tổng số giờ bạn đăng ký trên app từ đầu tuần.',
      'B. Là số giờ bạn ngồi bật app đợi đơn nhưng không di chuyển.',
      'C. Là tổng giờ chạy trong tuần sau khi đã trừ đi các ca bị xóa do vi phạm quy định (như vào trễ quá 5p, ngoài nội ô quá 15p...).'
    ],
    answer: 2,
    explanation: 'Giờ chạy thực tế = tổng giờ trong tuần trừ đi các ca bị xóa do vi phạm quy định.'
  },
  {
    id: 3,
    category: 'Mục 1: Chính sách & Chiết khấu',
    isRed: false,
    question: 'Hạn chót thanh toán % chiết khấu tuần về công ty là lúc nào?',
    options: [
      'A. Trước 24h00 Chủ nhật hàng tuần.',
      'B. Trước 22h00 tối Thứ 2 (sau 22h00 phạt 20.000đ; từ Thứ 3 trở đi phạt 50.000đ/ngày trễ).',
      'C. Bất kỳ lúc nào trong tháng khi có lương.'
    ],
    answer: 1,
    explanation: 'Bảng chiết khấu gửi chiều Thứ 2, hạn chót thanh toán trước 22h00 tối Thứ 2.'
  },
  {
    id: 4,
    category: 'Mục 2: Quy định & Nội quy',
    isRed: false,
    question: 'Khi bắt đầu ca, shipper bắt buộc phải thả vị trí ở đâu và nếu ở ngoài nội ô thì bị xử lý ra sao?',
    options: [
      'A. Bắt buộc thả vị trí trong nội ô; nếu ở ngoài nội ô quá 15 phút không di chuyển vào thì sẽ bị Bot tự động kick khỏi ca.',
      'B. Thả vị trí ở đâu cũng được, miễn trong địa bàn Cần Thơ.',
      'C. Thả vị trí ở nhà rồi đợi khi nào nổ đơn mới chạy vào.'
    ],
    answer: 0,
    explanation: 'Bắt buộc thả vị trí nội ô khi vào ca; ở ngoài nội ô quá 15 phút bot sẽ tự động kick khỏi ca.'
  },
  {
    id: 5,
    category: 'Mục 2: Quy định & Nội quy',
    isRed: false,
    question: 'Quy định về việc vào ca trễ và cách xin duyệt vào ca trễ hợp lệ là gì?',
    options: [
      'A. Cho phép trễ tối đa 15 phút mà không cần báo trước.',
      'B. Cứ vào trễ thoải mái, hệ thống sẽ tự động trừ giờ vào cuối tuần.',
      'C. Cho phép trễ tối đa 5 phút. Nếu trễ hơn phải báo trước giờ ca bắt đầu cho Tổng đài; khi tới nơi chụp Timestamp kèm /vaoca [vị_trí] [tiền] và tag Tổng đài duyệt.'
    ],
    answer: 2,
    explanation: 'Cho phép trễ tối đa 5 phút; nếu trễ hơn phải báo trước giờ ca bắt đầu cho Tổng đài, tới nơi chụp ảnh Timestamp kèm cú pháp /vaoca [vị_trí] [tiền] và tag Tổng đài duyệt.'
  },
  {
    id: 6,
    category: 'Mục 2: Quy định & Nội quy',
    isRed: true,
    question: 'Quy định chuẩn về việc mặc đồng phục và chở người khi chạy ca Citiship là gì?',
    options: [
      'A. Mặc áo khoác nào cũng được, được chở bạn bè chạy cùng cho vui.',
      'B. Bắt buộc mặc áo Citiship, quần dài suốt ca, trang bị nón bảo hiểm phụ sạch sẽ cho khách; tuyệt đối KHÔNG chở bạn bè/người thân khi đang trong ca làm việc.',
      'C. Chỉ cần mặc áo Citiship lúc chụp ảnh vào ca, sau đó cởi ra được.'
    ],
    answer: 1,
    explanation: 'Bắt buộc mặc áo Citiship, quần dài suốt ca, nón bảo hiểm phụ sạch sẽ cho khách; cấm chở người thân/bạn bè khi đang đi ca.'
  },
  {
    id: 7,
    category: 'Mục 3: Trung thực & Thái độ',
    isRed: true,
    question: 'Nếu chủ shop hoặc khách quen liên hệ nhờ bạn chạy đơn riêng ngoài app, bạn xử lý thế nào cho đúng quy định?',
    options: [
      'A. Gửi thông tin đơn về cho Tổng đài để Tổng đài tạo đơn trên hệ thống và bắn lại đơn đó cho chính mình chạy.',
      'B. Tự nhận chạy luôn để ăn trọn tiền ship không qua hệ thống.',
      'C. Từ chối thẳng và không hỗ trợ khách.'
    ],
    answer: 0,
    explanation: 'Gửi thông tin về cho Tổng đài tạo đơn trên hệ thống và bắn lại cho chính mình chạy để hợp lệ và được bảo hiểm đơn hàng.'
  },
  {
    id: 8,
    category: 'Mục 3: Trung thực & Thái độ',
    isRed: true,
    question: 'Đơn ship 16.000đ hoặc 18.000đ khách đưa tờ 20.000đ, shipper phải làm gì?',
    options: [
      'A. Tự ý bỏ túi 2.000đ - 4.000đ coi như tiền tip mặc định.',
      'B. Luôn chủ động thối đủ tiền thừa cho khách; chỉ nhận khi khách chủ động nói cho/tip.',
      'C. Báo khách không có tiền thối để khách tự cho.'
    ],
    answer: 1,
    explanation: 'Luôn chủ động thối tiền thừa cho khách, không tự ý làm tròn tiền tip.'
  },
  {
    id: 9,
    category: 'Mục 3: Trung thực & Thái độ',
    isRed: false,
    question: 'Nếu bạn đứng đợi đơn tại 1 vị trí quá 15 - 20 phút mà không có đơn, bạn phải làm gì?',
    options: [
      'A. Tiếp tục đứng yên đó bấm điện thoại đến hết ca để ăn trọn giờ.',
      'B. Tự ý tắt mạng đi uống cà phê.',
      'C. Chủ động di chuyển vào khu vực trung tâm hoặc các điểm nóng để đón đơn, giật box chung (nghiêm cấm đứng xa treo giờ).'
    ],
    answer: 2,
    explanation: 'Đợi quá 15-20p không có đơn phải chủ động di chuyển vào trung tâm đón đơn hoặc giật box chung, nghiêm cấm đứng xa treo giờ.'
  },
  {
    id: 10,
    category: 'Mục 4: Quy trình xử lý đơn',
    isRed: true,
    question: 'Đối với Đơn mua hộ thức ăn/uống, việc bắt buộc phải làm TRƯỚC KHI BỎ TIỀN MUA là gì?',
    options: [
      'A. Bắt buộc gọi khách xác nhận chi tiết món ăn (số lượng, ghi chú, giá tiền) và địa chỉ nhận hàng (nếu không gọi trước, rủi ro tự chịu 100%).',
      'B. Mua luôn cho nhanh rồi mang tới gọi khách sau.',
      'C. Nhắn tin qua Zalo đợi khách trả lời rồi mới mua.'
    ],
    answer: 0,
    explanation: 'Bắt buộc gọi khách chốt món ăn & địa chỉ trước khi mua. Không gọi trước sẽ không được công ty hỗ trợ bồi hoàn nếu bị boom hàng.'
  },
  {
    id: 11,
    category: 'Mục 4: Quy trình xử lý đơn',
    isRed: true,
    question: 'Với đơn nhận hàng từ shop mang giao cho khách, bắt buộc phải gọi khách vào thời điểm nào?',
    options: [
      'A. Chỉ gọi 1 lần khi đã đứng trước cửa nhà khách.',
      'B. Gọi khách xác nhận địa chỉ và tiền thu hộ TRƯỚC KHI RỜI SHOP/QUÁN (chụp ảnh nhật ký cuộc gọi gửi kèm đơn).',
      'C. Không cần gọi nếu đơn có ghi chú rõ địa chỉ.'
    ],
    answer: 1,
    explanation: 'Bắt buộc gọi khách xác nhận địa chỉ và tiền thu hộ trước khi rời shop để tránh bị boom hàng hoặc giao sai.'
  },
  {
    id: 12,
    category: 'Mục 4: Quy trình xử lý đơn',
    isRed: true,
    question: 'Nếu gặp đơn hàng khách nhờ shipper chuyển khoản hoặc nạp tiền qua trước rồi đến nơi khách đưa lại tiền mặt, shipper xử lý thế nào?',
    options: [
      'A. Tự ý chuyển khoản ngay theo lời khách để đi đơn cho nhanh.',
      'B. Cứ nhận đơn rồi đến nơi mới tính tiếp.',
      'C. Tuyệt đối KHÔNG nạp tiền/chuyển khoản trước vì là lừa đảo 100%, đồng thời báo ngay cho Tổng đài để được hỗ trợ.'
    ],
    answer: 2,
    explanation: 'Nhờ chuyển khoản/nạp tiền trước là thủ đoạn lừa đảo 100%, tuyệt đối không làm theo và phải báo ngay Tổng đài.'
  },
  {
    id: 13,
    category: 'Mục 4: Quy trình xử lý đơn',
    isRed: false,
    question: 'Đến điểm lấy hàng, nếu shop/quán nhờ bạn giao thêm 1 đơn phát sinh ngoài app, bạn xử lý thế nào?',
    options: [
      'A. Báo ngay về Tổng đài kiểm tra xem đã có tài xế khác nhận đơn chưa trước khi lấy (tránh lấy mất đơn của đồng đội).',
      'B. Nhận cầm đi luôn rồi tự thu tiền của khách.',
      'C. Cầm đơn đi giao rồi nhắn tổng đài sau khi giao xong.'
    ],
    answer: 0,
    explanation: 'Phải báo Tổng đài kiểm tra xem có tài xế khác nhận đơn đó chưa trước khi lấy để tránh tranh chấp.'
  },
  {
    id: 14,
    category: 'Mục 5: Hướng dẫn thao tác app',
    isRed: false,
    question: 'Khi hệ thống phân bổ đơn tới máy hoặc vừa giật đơn box chung, bạn phải bấm nút "NHẬN ĐƠN" trong bao lâu?',
    options: [
      'A. Lúc nào bấm cũng được, miễn trong ca.',
      'B. Phải bấm trong vòng 5 - 7 phút; quá thời gian này hệ thống tự động back đơn điều phối người khác và không giải quyết lại.',
      'C. Đợi đến nơi lấy hàng rồi mới bấm nhận đơn.'
    ],
    answer: 1,
    explanation: 'Phải bấm nhận đơn trong vòng 5-7 phút, quá thời gian hệ thống tự động thu hồi đơn giao cho tài xế khác.'
  },
  {
    id: 15,
    category: 'Mục 5: Hướng dẫn thao tác app',
    isRed: false,
    question: 'Trách nhiệm kiểm tra tin nhắn của shipper trong ca làm việc là gì?',
    options: [
      'A. Chỉ cần kiểm tra tin nhắn khi hết ca.',
      'B. Thường xuyên vào mục Chat trên app để kịp thời tiếp nhận các thông tin, điều phối và chỉ đạo khẩn từ Tổng đài.',
      'C. Tắt hết thông báo để tập trung lái xe.'
    ],
    answer: 1,
    explanation: 'Shipper phải thường xuyên kiểm tra mục Chat trên app để kịp thời tiếp nhận điều phối từ Tổng đài.'
  },
  {
    id: 16,
    category: 'Mục 6: Tiện ích tài khoản',
    isRed: false,
    question: 'Hạn đăng ký ca làm việc tuần tới là khi nào và yêu cầu tối thiểu là bao nhiêu tiếng/tuần?',
    options: [
      'A. Đăng ký vào Thứ 2 và tối thiểu 20 tiếng.',
      'B. Đăng ký bất kỳ lúc nào, không giới hạn số giờ.',
      'C. Đăng ký vào Thứ 7 & Chủ Nhật (đóng lúc 00:00 Thứ 2) và bắt buộc tối thiểu 30 tiếng/tuần.'
    ],
    answer: 2,
    explanation: 'Hạn chót đăng ký ca vào Thứ 7 & Chủ Nhật (đóng lúc 00:00 Thứ 2) và yêu cầu tối thiểu 30 tiếng/tuần.'
  },
  {
    id: 17,
    category: 'Mục 6: Tiện ích tài khoản',
    isRed: false,
    question: 'Khi đi giao đơn hàng thuộc diện "Công nợ" (công ty nợ shipper), shipper xử lý việc thu tiền ship thế nào cho đúng?',
    options: [
      'A. Tuyệt đối KHÔNG THU tiền ship của khách; công ty sẽ cộng tiền ship này vào bảng đối soát nộp Thứ 2.',
      'B. Thu tiền ship của khách rồi đem nộp lại công ty.',
      'C. Thu 50% tiền ship của khách để trừ hao xăng xe.'
    ],
    answer: 0,
    explanation: 'Đơn công nợ tuyệt đối KHÔNG thu tiền ship của khách, công ty sẽ đối soát cộng lại vào bảng thanh toán Thứ 2.'
  },
  {
    id: 18,
    category: 'Mục 7: Bảng lệnh hệ thống',
    isRed: false,
    question: 'Khi hết giờ làm việc và đã hoàn tất hết mọi đơn hàng, lệnh shipper dùng để kết thúc ca là gì?',
    options: [
      'A. /reset',
      'B. /hetca (hoặc /vt off)',
      'C. /thongke'
    ],
    answer: 1,
    explanation: 'Lệnh kết thúc ca là /hetca hoặc /vt off.'
  },
  {
    id: 19,
    category: 'Mục 7: Bảng lệnh hệ thống',
    isRed: false,
    question: 'Lệnh hệ thống nào dùng để tra cứu công nợ nộp tiền chiết khấu Thứ 2?',
    options: [
      'A. /nocong',
      'B. /phi',
      'C. /di'
    ],
    answer: 0,
    explanation: 'Lệnh /nocong dùng để tra cứu chi tiết công nợ chiết khấu nộp vào Thứ 2.'
  },
  {
    id: 20,
    category: 'Mục 8: Hỗ trợ & Giải đáp',
    isRed: false,
    question: 'Khung giờ hoạt động và kênh liên hệ chính thức để được hỗ trợ sự cố, khiếu nại cước phí là gì?',
    options: [
      'A. Chỉ hỗ trợ vào giờ hành chính các ngày trong tuần.',
      'B. Mục Chat trực tiếp trên App Citiship hoạt động từ 7h00 đến 22h00 hàng ngày.',
      'C. Gọi điện trực tiếp cho Giám đốc bất cứ lúc nào.'
    ],
    answer: 1,
    explanation: 'Mục Chat trên App Citiship hoạt động từ 7h00 đến 22h00 hàng ngày là kênh hỗ trợ chính thức tiếp nhận giải quyết sự cố và khiếu nại.'
  },
  {
    id: 21,
    category: 'Mục 8: Hỗ trợ & Giải đáp',
    isRed: false,
    question: 'Khi phát sinh vi phạm quy chế hoặc bị phạt tiền/xóa ca, shipper có quyền làm gì?',
    options: [
      'A. Bắt buộc im lặng chấp nhận mọi quyết định mà không được thắc mắc.',
      'B. Đăng bài lên mạng xã hội để tranh cãi.',
      'C. Gửi khiếu nại qua mục Chat trên App kèm bằng chứng đối soát; Tổng đài tiếp nhận và phản hồi giải quyết minh bạch trong vòng 24h - 48h.'
    ],
    answer: 2,
    explanation: 'Shipper có quyền gửi giải trình khiếu nại qua Chat App kèm mã đơn/ngày ca và hình ảnh đối soát; Tổng đài xử lý trong 24h - 48h.'
  },
  {
    id: 22,
    category: 'Mục 4: Quy trình xử lý đơn',
    isRed: false,
    question: 'Khi gặp sự cố đơn hàng bị "boom" (khách không nhận, gọi không nghe máy), shipper phải xử lý thế nào?',
    options: [
      'A. Tự ý hủy đơn rồi mang hàng về nhà ăn hoặc bán lại.',
      'B. Lập tức dừng xử lý, chụp nhật ký cuộc gọi và tag ngay @citiship_cantho để Tổng đài điều phối hỗ trợ theo quy trình.',
      'C. Đứng trước cửa nhà khách chửi bới làm phiền hàng xóm.'
    ],
    answer: 1,
    explanation: 'Khi bị boom hàng phải dừng xử lý, chụp log gọi xác nhận và tag ngay Tổng đài để được hướng dẫn quy trình bồi hoàn.'
  },
  {
    id: 23,
    category: 'Mục 3: Trung thực & Thái độ',
    isRed: true,
    question: 'Khi khách hàng hoặc người nhận thông báo đã chuyển khoản thanh toán và gửi ảnh chụp màn hình bill thành công, shipper xử lý thế nào?',
    options: [
      'A. Nhìn ảnh chụp bill thấy đúng số tiền và tên tài khoản là tin tưởng giao hàng ngay.',
      'B. Bắt buộc kiểm tra biến động số dư thực tế trong tài khoản (hoặc xác nhận tiền đã vào tài khoản), tuyệt đối không tin ảnh chụp bill vì có thể làm giả.',
      'C. Nhờ người nhận ký tên vào tờ giấy biên nhận rồi bàn giao hàng.'
    ],
    answer: 1,
    explanation: 'Quy Tắc Đỏ cốt lõi: Tuyệt đối không tin ảnh chụp bill chuyển khoản; phải kiểm tra biến động số dư tài khoản ngân hàng thực tế.'
  },
  {
    id: 24,
    category: 'Mục 2: Quy định & Nội quy',
    isRed: true,
    question: 'Hành vi cho người khác mượn tài khoản hoặc nhận ca chạy chui hộ người khác sẽ bị xử lý như thế nào?',
    options: [
      'A. Chỉ bị nhắc nhở nội bộ và phạt 50.000đ nợ công.',
      'B. Chấm dứt hợp tác ngay lập tức, truy thu nợ công bằng toàn bộ phí ship tuần và chuyển cơ quan chức năng nếu có dấu hiệu vi phạm pháp luật.',
      'C. Bị tạm khóa tài khoản trong vòng 24 giờ.'
    ],
    answer: 1,
    explanation: 'Quy Tắc Đỏ: Nghiêm cấm chạy chui hoặc cho mượn tài khoản; vi phạm sẽ bị chấm dứt hợp tác ngay và xử lý theo quy định.'
  },
  {
    id: 25,
    category: 'Mục 2: Quy định & Nội quy',
    isRed: true,
    question: 'Lý do bắt buộc 100% đơn hàng phải chụp ảnh hàng hóa và biên nhận bằng app Timestamp Camera là gì?',
    options: [
      'A. Chụp để lưu làm kỷ niệm cá nhân của chuyến xe.',
      'B. Là bằng chứng xác thực duy nhất minh oan và bảo vệ shipper khi có khiếu nại thiếu hàng, đổi hàng hoặc quán giao sai món.',
      'C. Chụp bằng camera thường cũng có giá trị pháp lý tương đương.'
    ],
    answer: 1,
    explanation: 'Quy Tắc Đỏ: Ảnh Timestamp tại shop/quán là căn cứ duy nhất minh oan cho shipper khi phát sinh tranh chấp hoặc khiếu nại.'
  },
  {
    id: 26,
    category: 'Mục 3: Trung thực & Thái độ',
    isRed: true,
    question: 'Hành vi tự tạo đơn ảo hoặc cố tình đứng xa khu vực chỉ định để "treo giờ" ăn ca bị xử lý ra sao?',
    options: [
      'A. Bị cảnh cáo và chỉ được tính 50% số giờ của ca làm việc đó.',
      'B. Coi là gian lận có chủ ý, lập tức bị xóa toàn bộ ca làm việc đó và xem xét chấm dứt hợp tác nếu tái phạm.',
      'C. Không bị xử lý nếu cuối ca vẫn đủ điều kiện đóng ca.'
    ],
    answer: 1,
    explanation: 'Quy Tắc Đỏ: Tạo đơn ảo hoặc treo giờ ăn ca là hành vi gian lận nghiêm trọng, sẽ bị xóa ca ngay và xử lý kỷ luật chấm dứt hợp tác.'
  }
];
