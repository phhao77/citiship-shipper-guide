# PROJECT CONTEXT - Citiship Shipper Guide

## ⚠️ RULE BẮT BUỘC (dành cho mọi AI/dev)
1. **ĐỌC file này trước** khi làm bất cứ việc gì (thêm tính năng, sửa lỗi, đọc dự án).
2. **CẬP NHẬT file này ngay trong cùng lần code** nếu có thay đổi về: cấu trúc file, tính năng, cách thêm nội dung, quyết định thiết kế, TODO.
3. Context phải **luôn đồng bộ với source code**. Nếu thấy lệch, sửa context theo code thực tế.
4. Trả lời và viết commit message bằng **tiếng Việt**.

## Mục đích
Web tĩnh giúp shipper (Đối tác giao hàng Citiship) đọc nội quy, chính sách, quy trình đi đơn, hướng dẫn dùng app, bảng lệnh Telegram, hỗ trợ... Sau này có thể mở rộng thêm.

## Nguyên tắc giao diện
- Đơn giản, không màu mè, trực quan, **tập trung vào nội dung**.
- Mobile-first (shipper chủ yếu dùng điện thoại), chữ lớn dễ đọc.
- Không dùng thư viện/framework, không cần build.

## Tech stack
HTML + CSS + JavaScript thuần. Chạy bằng cách mở `index.html` hoặc host tĩnh bất kỳ.

## Cấu trúc file
| File | Vai trò |
|---|---|
| `index.html` | Khung trang, nạp CSS/JS |
| `style.css` | Toàn bộ style |
| `content.js` | **Nội dung**: `SITE` (tiêu đề, giới thiệu) và `PAGES` (danh sách mục) |
| `app.js` | Router theo hash (`#/` trang chủ, `#/<id>` trang nội dung), render |
| `PROJECT_CONTEXT.md` | File này |
| `AGENTS.md` | Nhắc AI đọc context |

## Cách hoạt động
- Trang chủ: danh sách các mục từ `PAGES`.
- Trang mục: render `page.html` của mục có `id` tương ứng.
- Không có backend, không lưu dữ liệu.

## Cách thêm / sửa nội dung
Thêm object vào `PAGES` trong `content.js`:
`{ id: 'slug', title: '...', summary: '...', html: '<p>...</p>' }`
Không cần sửa file khác.

## Các mục hiện có (id)
chinh-sach, quy-dinh, trung-thuc, quy-trinh, huong-dan-app, tai-khoan, lenh-telegram, ho-tro

## Trạng thái
- [x] Khung web + router + 8 mục
- [x] Nội dung thật: Đã hoàn thiện toàn bộ 8/8 mục (`chinh-sach`, `quy-dinh`, `trung-thuc`, `quy-trinh`, `huong-dan-app`, `tai-khoan`, `lenh-telegram`, `ho-tro`), không còn nội dung mẫu (draft).
- [ ] Mục "Thời gian thử việc" (ý tưởng từ web tham khảo: "Hết tuần đầu tiên")
- [ ] Tìm kiếm, ảnh minh họa, deploy

## Ý tưởng tương lai
Tìm kiếm nội dung, ảnh/video hướng dẫn app, FAQ gập mở, trang quản trị nội dung.

## Trang chủ
Lưới thẻ có icon (emoji trong vòng tròn): 4 cột trên máy tính, 2 cột trên điện thoại. Mỗi mục trong `PAGES` cần thêm `icon` (emoji) và `tone` (`'o'` nền cam nhạt, `'b'` nền xanh nhạt). Trường `summary` hiện không hiển thị ở trang chủ (giữ để dùng sau).

## Kiểu trang nội dung
Mỗi mục trong `PAGES` dùng 1 trong 2 kiểu:
- **Trang thường:** có trường `html` (hiện toàn bộ nội dung).
- **Đọc từng bước:** có trường `steps: [{ title, html }, ...]` thay cho `html`. Mỗi lần hiện 1 ý, có thanh tiến độ "Ý n / tổng", nút Trước/Tiếp, ý cuối là nút "Xong ✓" về trang chủ. Link từng ý: `#/<id>/<n>` (render trong `renderSteps` ở `app.js`, style `.progress`, `.nav`, `.btn` trong `style.css`).
Hiện dùng `steps`: `chinh-sach` (nội dung thật, 7 ý: chiết khấu, bảng %, thưởng cao điểm, thưởng box chung, phạt đăng ký/thiếu giờ, phạt box chung, phạt đóng trễ). Dự kiến dùng tiếp cho `quy-trinh`, `huong-dan-app`.
Mục đã có nội dung thật: `chinh-sach`, `quy-trinh` (5 bước: tiếp nhận, phân loại đơn, xác minh địa chỉ, xử lý phát sinh, hoàn tất và báo vị trí; dùng `steps`), `trung-thuc` (7 ý: không nhận đơn riêng, không tạo đơn ảo, không chạy nhiều app, không kê tiền, không bỏ ca, thái độ với khách, không treo đơn; dùng `steps`), `quy-dinh` (13 ý: chụp ảnh vào ca, giờ vào ca, chụp hình khi đi đơn, đơn gửi bảo vệ/tặng quà, tuân thủ và xử phạt chụp hình, gọi khách xác nhận trước, dụng cụ, đồng phục (mặc suốt ca), áp dụng đồng phục (mua áo, ảnh vào ca hợp lệ), chở bạn và quần dài, nói không với chạy chui (có ảnh `images/vi-du-random-check.png`), bị xóa giờ chạy, ca không hợp lệ), `huong-dan-app` (7 bước có hình minh họa: Vào ca, Báo vị trí, Box chung, Nhận đơn & báo cước phát sinh, Chụp & tải ảnh bằng chứng, Hoàn tất & xem lịch sử, Chat hỗ trợ), `tai-khoan` (6 bước: Bước đầu là Tổng quan Menu 5 số, sau đó là chi tiết 5 mục: Thống kê hôm nay, Thống kê tuần này, Đăng ký ca, Xem ca đã đăng ký, Công nợ / Nợ công có đầy đủ ảnh chụp thật của từng màn hình).
Chỉ còn 2 mục chưa có nội dung thật: `lenh-telegram`, `ho-tro`.

## Thêm ảnh vào nội dung
- Bỏ file ảnh vào thư mục `images/` (tên không dấu, không khoảng trắng, ví dụ `anh-vao-ca.jpg`; nên nén nhỏ, dưới khoảng 300KB/ảnh vì shipper dùng mạng điện thoại).
- Trong `html` của mục/ý, chèn: `<figure><img src="images/anh-vao-ca.jpg" alt="Mô tả ảnh"><figcaption>Chú thích</figcaption></figure>`.
- Style ảnh nằm trong `style.css` (`.content img`, `.content figcaption`): tự co vừa chiều rộng màn hình.

## Changelog
- 2026-11-01: Khởi tạo dự án, khung web và context.
- 2026-11-01: Làm đẹp CSS nhẹ: nền xám nhạt, mục là thẻ trắng bo góc, màu nhấn cam `--accent` (biến CSS ở đầu `style.css`), header dính trên cùng; nội dung trang bọc trong `<div class="content">` (render trong `app.js`). Class có sẵn cho nội dung: `.note`, `.draft`, bảng, `code`.
- 2026-11-01: Đổi trang chủ từ danh sách sang lưới thẻ icon (giống brainstorm-site); thêm icon/tone vào PAGES; chuyển dự án ra Desktop; đã deploy thử lên Netlify.
- 2026-11-01: Thêm kiểu trang "đọc từng bước" (steps), chinh-sach dùng kiểu này.
- 2026-11-01: Tích hợp đầy đủ nội dung thật và hình ảnh chụp app cho 2 mục lớn: 'huong-dan-app' (7 bước) và 'tai-khoan' (3 bước tiện ích & công nợ).
- 2026-11-01: Đã che thông tin cá nhân (họ tên, biển số, mã) trên cả 2 ảnh Đăng ký ca và Xem ca đã đăng ký.
- 2026-11-01: Nâng cấp toàn diện giao diện CSS theo nhận diện Citiship (xanh dương đậm + cam), gắn logo công ty lên header, đổ bóng card mượt mà, căn chỉnh ảnh chụp app đẹp mắt.
- 2026-11-02: Thay thế logo Citiship mới dạng nền trong/sáng (icon tên lửa + chữ CitiShip xanh/cam).
- 2026-11-02: Hoàn tất toàn bộ 8/8 mục nội dung thật. Bổ sung Ký quỹ 500k & quy trình nghỉ việc, quy định đổi ca (không đổi T7, CN, Lễ), link group Telegram, bảng lệnh Telegram và quy trình xử lý đơn sự cố boom hàng.
- 2026-11-02: Đưa mục 'Ký quỹ 500k & Quy trình nghỉ việc' lên bước đầu tiên của 'Chính sách, chiết khấu'; Đổi tên mục 'Bảng lệnh Telegram' thành 'Bảng lệnh', bổ sung đầy đủ các lệnh hệ thống: /phi, /hetca, /vt off, /reset, /di, /vaoca, /thongke, /thongketuan (áp dụng cho cả chat app và Telegram).
- 2026-11-02: Chỉnh CSS bảng lệnh không bị rớt dòng (white-space nowrap); Bổ sung lệnh /nocong; Cập nhật chi tiết 2 bước báo phí hàng nặng/cồng kềnh và lưu ý đơn ship báo sau; Bổ sung mô tả chi tiết /nocong vào mục Tài khoản.
- 2026-11-02: Bỏ cụm 'như hình minh họa' ở bước báo phí; Nâng cấp mục 'Quy trình xử lý đơn' thành 5 bước toàn diện gồm: Tổng quan, Quy trình đơn giao hàng (6 bước + sự cố), Quy trình đơn mua hàng (6 bước + sự cố), Cảnh báo ứng tiền hàng (8 chiêu trò lừa đảo), và Xử lý phát sinh cước & đơn xa.
- 2026-11-02: Bổ sung cú pháp chuẩn cho phần 'Cách xin vào ca trễ' ở mục Quy định: gửi ảnh chụp Timestamp ngay lúc đó kèm lệnh /vaoca [vị_trí] [số_tiền] và tag tổng đài duyệt (xóa bỏ ghi chú draft).
- 2026-11-02: Đổi tên toàn bộ website từ 'Cẩm nang Shipper' thành 'Nội Quy & Quy Trình Citiship' (trên title, header và trang chủ).
- 2026-11-02: Bổ sung chi tiết thời gian nhận bảng chiết khấu (chiều Thứ 2 về tài khoản), thời hạn thanh toán trước 22h00 và hướng dẫn liên hệ Tổng đài giải đáp thắc mắc trước khi chốt nộp.
- 2026-11-02: Tích hợp hoàn chỉnh hệ thống lưu dữ liệu Supabase: Modal đăng nhập (Shipper/Tổng đài), nút xác nhận 'Tôi đã đọc và hiểu rõ' ở bước cuối mỗi mục, tự động tick 8 cột tương ứng trên Supabase, hiển thị tiến độ đọc và huy hiệu 'Đã hiểu' trên trang chủ.
- 2026-11-02: Tạo trang quản trị bí mật (#/admin) kèm mã PIN bảo mật (1234), bảng theo dõi chi tiết 8 cột tick xanh theo thời gian thực từ Supabase, bộ lọc tìm kiếm và nút xuất file Excel/CSV.
- 2026-11-02: Đổi mã PIN trang quản trị (#/admin) sang `0707`, ẩn gợi ý mã PIN trong placeholder để tăng cường bảo mật.
- 2026-11-03: Tái thiết kế toàn diện giao diện Trang Quản trị (#/admin) trực quan & chuyên nghiệp:
  + Mở rộng khung layout (`max-width: 1380px`) cho giao diện dashboard rộng rãi, dễ theo dõi.
  + Bổ sung 4 thẻ KPI thống kê thời gian thực: Tổng Shipper, Đã hoàn tất (8/8), Đang đọc dở, Tỷ lệ hoàn tất (%).
  + Nâng cấp bảng dữ liệu: Chip SĐT monospace, tick tròn xanh (✓) và gạch xám (-) tinh tế cho 8 mục, thanh tiến độ mini có % hoàn thành, huy hiệu trạng thái có chấm tròn phát sáng (badge-dot).
  + Thêm nút "Khóa PIN" nhanh (`logoutAdmin`), thanh đếm số lượng shipper hiển thị, hiệu ứng hover từng dòng, trạng thái loading spinner và empty state khi tìm kiếm.
  + Thiết kế lại giao diện nhập mã PIN bảo mật sang trọng, hiện đại.
- 2026-11-03: Thêm nút truy cập Quản trị "📊 Quản trị" trực tiếp trên thanh topbar và chân trang chủ; Đổi mã PIN trang quản trị (#/admin) sang `07072002`.
- 2026-11-03: Nâng cấp toàn diện thẩm mỹ giao diện & khắc phục khoảng trắng dư thừa ở đáy trang:
  + Nền ambient gradient nhận diện Citiship (ánh sáng xanh navy + cam nhẹ) có chiều sâu hiện đại.
  + Topbar kính mờ (glassmorphism) kèm bóng đổ tinh tế.
  + Thẻ bài học bo tròn 16px, hiệu ứng hover nhấc nổi 3D, bổ sung mô tả ngắn dưới tên mục.
  + Loại bỏ đường kẻ đứt đoạn thừa, thay bằng Chân trang công ty (Site Footer) với cơ chế `flex: 1` ôm sát đáy màn hình, không còn bị hở mảng trắng bên dưới.
- 2026-11-03: Tái cấu trúc mục "2. Quy định" thành dạng thẻ trực quan (Do's & Don'ts):
  + Giữ nguyên 100% nội dung, luật và chế tài thưởng phạt nhưng chuyển văn bản dài thành các thẻ Xanh (chuẩn), Đỏ (cấm kỵ), Vàng (cảnh báo) và thanh tóm tắt nhanh (quick-summary).
  + Rút gọn từ 13 bước còn 11 bước mạch lạc, loại bỏ các ý lặp lại, shipper đọc quét 3 giây là nắm trọn ý.
- 2026-11-03: Đồng bộ toàn diện tất cả các mục nội dung sang dạng thẻ trực quan (Do's & Don'ts):
  + Tích hợp ảnh chụp thực tế vào ca Timestamp Camera (có địa chỉ, ngày giờ và caption `/vaoca 30/4 1tr`) vào Bước 1 mục "Quy định".
  + Chuẩn hóa đồng nhất cả 8 mục: Giữ nguyên 100% quy định, chính sách, tiền phạt, nhưng chuyển đổi văn bản dài thành thanh tóm tắt 1 câu, thẻ xanh việc cần làm, thẻ đỏ điều cấm/mức phạt, checklist xử lý sự cố. Website hoàn toàn thoát khỏi tình trạng "ngợp chữ".
  + Khắc phục sự cố cú pháp trùng lặp thẻ HTML ở bước 1 mục Quy định, khôi phục hiển thị toàn bộ trang web bình thường.
- 2026-11-03: Tích hợp hiệu ứng hoạt họa xe Shipper chạy trên thanh tiến độ & Sơ đồ lộ trình đơn hàng:
  + Nâng cấp thanh tiến độ (.progress-road) trên toàn bộ trang: Xe máy shipper 🛵 nhún nhảy nổ máy và phóng mượt mà dọc thanh cam khi bấm "Tiếp →", cán lá cờ đích 🏁 ở bước cuối cùng. Chạy bằng CSS tăng tốc phần cứng GPU nên siêu mượt, nhẹ (< 1KB), 60fps và hoàn toàn không gây lag trên mọi dòng điện thoại.
  + Thêm Sơ đồ Lộ trình Đơn hàng trực quan (Delivery Journey Roadmap: Lấy hàng ➜ Gọi khách ➜ Đi giao ➜ Xong đơn) vào mục "Quy trình xử lý đơn".
- 2026-11-03: Tích hợp Widget Dự báo thời tiết Ninh Kiều, Cần Thơ trên trang chủ:
  + Thẻ thời tiết kính mờ (glassmorphism) tông màu xanh navy Citiship kèm quả cầu sáng neon đổi màu khi hover.
  + Tự động cập nhật thời tiết thực tế (nhiệt độ hiện tại, min/max, tình trạng nắng mưa) tại Ninh Kiều, Cần Thơ qua API thời tiết, có sẵn chế độ chạy mượt mà ngay cả khi offline. Hỗ trợ anh em shipper biết trước thời tiết để chuẩn bị áo mưa trước khi vào ca.
- 2026-11-03: Nâng cấp icon Vector SVG thuần & Chế độ cập nhật thời tiết liên tục:
  + Khắc phục triệt để lỗi ảnh bị hỏng (broken image icon) do chuỗi base64 nhúng trong SVG ở mẫu cũ: Thay bằng bộ Vector SVG thuần (Pure SVG) sắc nét 100%, tự động biến đổi hình ảnh theo thời tiết (Nắng ráo ☀️, Có mây ⛅, Mưa nhỏ 🌧️, Mưa rào/Giông ⛈️) cùng hiệu ứng bồng bềnh nhẹ.
  + Cơ chế cập nhật thời tiết liên tục: Tự động sync ngầm mỗi 15 phút một lần, tự làm mới ngay khi người dùng mở lại tab hoặc quay về trang chủ, đồng thời cho phép bấm trực tiếp vào thẻ thời tiết để cập nhật tức thì.
- 2026-11-03: Thêm Chế độ Tối (Dark Mode) toàn diện & Thay thế icon Xe Shipper chạy tiến:
  + Chế độ Dark Mode: Nút chuyển đổi nhanh `🌙` / `☀️` trên thanh Topbar, ghi nhớ tùy chọn vào localStorage và đồng bộ theo chế độ hệ điều hành. Phủ màu tối cao cấp (Slate-950/Slate-900) dịu mắt cho tài xế chạy ca đêm, tương thích toàn bộ trang chủ, trang chi tiết quy trình, thẻ quy định Do/Don't, bảng quản trị và modal.
  + Thay thế icon xe chạy ngược: Khắc phục triệt để lỗi emoji `🛵` bị quay sang trái (chạy lùi). Thiết kế riêng icon Vector SVG Shipper Citiship chạy tiến về phía trước ➡️ (quay sang phải, có nón bảo hiểm, áo khoác xanh Citiship, thùng hàng cam phía sau, đèn pha chiếu sáng phía trước và vệt khói tăng tốc phía sau; bốc đầu ăn mừng khi chạm cờ đích 🏁).
- 2026-11-03: Tích hợp Định vị GPS tự động cập nhật thời tiết theo vị trí thực tế:
  + Sử dụng HTML5 Geolocation API kết hợp dịch vụ giải mã địa danh tiếng Việt (BigDataCloud reverse geocode) và Open-Meteo để tự động nhận diện Quận/Huyện, Tỉnh/Thành phố của Shipper (VD: Cái Răng, Ninh Kiều, Bình Thủy...).
  + Tự động lưu vị trí vào máy, chỉ cần bấm trực tiếp vào thẻ thời tiết để làm mới GPS bất cứ lúc nào; nếu từ chối quyền vị trí sẽ tự động fallback về trung tâm Ninh Kiều, Cần Thơ.
- 2026-11-04: Bổ sung Hướng dẫn 4 bước lấy link Google Maps để báo phí ship:
  + Tích hợp hình ảnh tổng hợp 4 bước trực quan (`images/huong-dan-lay-link-map.jpg`): Bước 1 (Chọn vị trí) ➔ Bước 2 (Bấm Chia sẻ) ➔ Bước 3 (Bấm Sao chép link) ➔ Bước 4 (Dán gửi Tổng đài).
  + Đã che mờ danh bạ gợi ý Zalo để bảo mật thông tin riêng tư.
  + Tích hợp hình ảnh và quy trình 4 bước chuẩn vào mục "Hướng dẫn thao tác" (Bước 4: Nhận đơn & Xử lý đơn phát sinh) và tóm tắt nhanh tại mục "Quy trình xử lý đơn".
- 2026-11-04: Tích hợp Tính năng Phóng to ảnh (Image Lightbox Zoom):
  + Cho phép shipper chạm/bấm vào bất kỳ hình ảnh minh họa nào trên web để phóng to toàn màn hình sắc nét.
  + Hiệu ứng nền mờ sang trọng (backdrop blur), hiển thị chú thích ảnh rõ ràng, có nút đóng (✕), chạm vào ảnh hoặc bấm ra ngoài hoặc nhấn Esc đều đóng mượt mà. Khóa cuộn trang khi đang zoom.
- 2026-11-05: Cập nhật & bổ sung 7 quy định tác phong và thao tác đơn mới:
  + Vị trí vào ca: Bắt buộc thả vị trí trong nội ô; nếu ở ngoài nội ô quá 15 phút không vào nội ô sẽ bị bot tự động kick khỏi ca (cập nhật ở mục Quy định & Hướng dẫn thao tác).
  + Tránh treo giờ đứng xa: Đợi đơn 1 chỗ quá 15 - 20 phút phải chủ động di chuyển vào trung tâm đón đơn hoặc giật box chung; bận việc riêng phải xin off ca (`/vt off`), nghiêm cấm đứng xa để treo giờ ăn ca.
  + Nhận đơn trong 5 - 7 phút: Bắn đơn hoặc giật box chung phải bấm nhận đơn ngay; quá 5 - 7 phút hệ thống tự động back đơn điều phối người khác và không giải quyết lại.
  + Điều kiện back đơn & Cấm lựa đơn: Chỉ hỗ trợ back đơn khi xa > 2km hoặc có lý do chính đáng; nếu đã lỡ di chuyển thì chụp ảnh Timestamp ngay lúc đó gửi Tổng đài duyệt back đơn; tuyệt đối nghiêm cấm hành vi lựa đơn/chọn đơn/né đơn.
  + Đơn phát sinh thêm tại Shop/Quán: Phải báo ngay về Tổng đài kiểm tra xem có tài xế khác qua nhận chưa trước khi lấy, tránh tình trạng lấy mất đơn của bạn đến sau.
  + Luôn check tin nhắn Tổng đài: Bắt buộc thường xuyên kiểm tra mục Chat để tiếp nhận kịp thời thông báo và điều phối khẩn từ TĐV.
  + Xin đơn Box chung sau 20s: Sau 20s trên box chung nếu vẫn còn đơn thì TĐV sẽ hỗ trợ bắn trực tiếp cho shipper nào nhắn xin.
  + Đơn mua hàng (gọi xác nhận món & địa chỉ): Nhấn mạnh bắt buộc gọi khách xác nhận chi tiết món ăn (số lượng, ghi chú) và địa chỉ giao hàng trước khi mua hàng; không gọi trước sẽ bị từ chối hỗ trợ bồi hoàn 100% nếu có sự cố.
  + Đưa toàn bộ source code lên GitHub `phhao77/citiship-shipper-guide` và kích hoạt tự động deploy qua GitHub Pages (`https://phhao77.github.io/citiship-shipper-guide/`). Có thể kết nối thêm Cloudflare Pages để tự động deploy song song.
  + Thêm Favicon logo Citiship vào thẻ `<head>` của `index.html` (thay thế biểu tượng quả địa cầu mặc định trên tab trình duyệt).
  + Thay thế toàn bộ cụm từ "sống còn" thành "quan trọng / hàng đầu" trên toàn bộ nội dung web cho nhẹ nhàng, chuyên nghiệp.
- 2026-11-06: Tinh chỉnh giao diện mobile, Dark Mode & cập nhật các quy chế nội bộ mới:
  + Sửa triệt để lỗi vỡ Header trên điện thoại: Tối ưu tên thương hiệu gọn gàng (`CitiShip` trên mobile), co giãn icon/label Quản trị và User pill linh hoạt 1 dòng không bao giờ bị rớt chữ.
  + Gỡ bỏ widget thời tiết để trang chủ tinh gọn, tải nhanh, tập trung hoàn toàn vào 8 mục chính.
  + Khắc phục hoàn toàn lỗi màu nền trắng/chữ chìm của Bảng chiết khấu trong Dark Mode (đồng bộ chuẩn Slate Dark dịu mắt).
  + Bổ sung ví dụ thực tế tính tiền nộp Thứ 2 (với mốc doanh thu 1.000.000đ) và làm rõ định nghĩa "Giờ chạy thực tế" sau khi trừ các ca vi phạm.
  + Thêm "3 Tầng Trí Nhớ & 15 Quy Tắc Đỏ" vào mở đầu mục Quy định.
  + Thêm Checklist trước khi vào ca và cơ chế xử lý khi mất mạng/lỗi GPS vào mục Hướng dẫn app.
  + Thêm "Ma trận xử lý vi phạm công bằng & Quy trình ra quyết định minh bạch" vào mục Khiếu nại.
  + Thêm lưu ý nội bộ chính thức ở chân trang: *"Tài liệu lưu hành nội bộ của Công ty Citiship. Mọi chính sách chiết khấu, quy trình đi đơn và chế tài xử lý vi phạm do Ban Điều hành Citiship phê duyệt và có hiệu lực thi hành đối với tất cả Đối tác tài xế."*
  + Làm rõ triệt để định nghĩa "Giờ chạy thực tế = tổng giờ trong tuần trừ đi các ca bị xóa do vi phạm quy định" trên toàn bộ các mục liên quan (Chính sách, Bảng % chiết khấu, Chế tài thiếu giờ, Quy định xóa giờ ca, Thống kê tuần).
- 2026-11-06: Tích hợp hệ thống 3 Vai trò (Roles) & Module Bài Test Kiến Thức dành cho Shipper Mới:
  + **3 Vai trò đăng nhập:** `Tổng đài viên` (`tongdai`, xem tự do, không cần tick/thi), `Shipper đang chạy` (`shipper_cu`, xác nhận đọc 8 mục, miễn test), `Shipper mới / Thử việc` (`shipper_moi`, bắt buộc đọc 8/8 mục rồi làm bài test 22 câu).
  + **Chuẩn hóa quy trình xử lý đơn riêng:** Cập nhật mục "Không nhận đơn riêng" tại `trung-thuc`: Nếu khách/shop quen liên hệ book riêng, shipper gửi thông tin về Tổng đài tạo đơn trên hệ thống và bắn lại cho chính mình chạy.
  + **Bộ đề 22 câu trắc nghiệm thực tế (`EXAM_QUESTIONS`):** Bám sát 100% nội dung 8 mục quy trình Citiship, có giải thích đáp án cặn kẽ (đã chuẩn hóa Câu 7 đơn book riêng, Câu 12 khách nhờ chuyển khoản trước báo tổng đài xác minh khách cũ/mới, Câu 17 hạn đăng ký T7 & CN tối thiểu 30 tiếng, Câu 18 đơn công nợ tuyệt đối không thu tiền khách; đã đảo ngẫu nhiên phân bố đáp án đúng đều khắp cả 3 phương án: 8 câu A, 7 câu B, 7 câu C chống đoán mò).
  + **Giao diện Làm bài test (Test Mode - `#/exam`):** Đổi từ "Phòng thi sát hạch" sang "Làm bài test / Bài test kiến thức"; mở khóa khi hoàn thành training 8/8 mục; khóa topbar navigation trong lúc làm bài; kiểm tra đầy đủ 22 câu trước khi nộp; tiêu chuẩn ĐẠT ≥ 19/22 câu (≥ 85%).
  + **Trang Kết quả bài test (`#/exam-result`):** Chấm điểm tự động, báo Đậu/Rớt, đối chiếu đáp án chi tiết từng câu kèm lời giải thích; cho phép làm lại bài test; tự động sync điểm số và trạng thái lên Supabase.
  + **Nâng cấp Dashboard Quản trị (`#/admin`):** Thêm 2 thẻ KPI (Shipper Mới, Đã Đậu Bài Test), thêm 2 cột Vai trò & Điểm Bài Test trong bảng dữ liệu, bổ sung bộ lọc nâng cao và đồng bộ xuất file Excel/CSV đầy đủ.
  + **Khắc phục triệt để lỗi hiển thị trên điện thoại:**
    - Cắt bỏ khoảng viền trong suốt thừa của file logo PNG, nâng độ sắc nét và kích thước thực tế lên 2.5 lần.
    - Ẩn text `.brand-compact` trên mobile để tránh lặp chữ "CitiShip" cạnh logo, giúp thanh Topbar thoáng đãng, không bị chèn ép.
    - Sửa lỗi Bảng lệnh hệ thống bị tràn viền (overflow): Thêm `overflow-x: auto;` vào `.content`, giảm padding mobile, cho phép `.cmd-cell` ngắt dòng linh hoạt và điều chỉnh min-width cột cú pháp.
    - Sửa thanh tiến độ `.up-text` không bị co cụm chữ theo hàng dọc trên màn hình hẹp.
    - Đổi thông điệp thẻ: *"Lộ trình training shipper mới — Bạn cần training 8/8 mục để làm bài test 22 câu"*.
    - Bổ sung quyền hạn Ban Lãnh đạo vào chân trang: *"có thể được điều chỉnh, cập nhật linh hoạt theo quyết định của Ban Lãnh đạo Công ty để phù hợp với tình hình vận hành thực tế"*.
- 2026-11-09: Rà soát & Cập nhật chính sách, quy chế và quy trình vận hành theo góp ý thẩm định:
  + **Giảm thiểu rủi ro pháp lý:** Chuyển đổi toàn bộ từ ngữ "thôi việc" thành "chấm dứt hợp tác"; bỏ câu "báo về gia đình" tại mục chạy chui, thay bằng "chuyển cơ quan chức năng xử lý nếu có dấu hiệu vi phạm pháp luật (lộ dữ liệu đơn hàng, lạm dụng tín nhiệm)".
  + **Sửa lỗi chính tả & chuẩn hóa thuật ngữ:** Thay thế toàn bộ chữ "dựt" thành "giật" (giật đơn box chung, giật box chung) trên toàn bộ tài liệu và bài test.
  + **Chính sách & Chiết khấu (Mục 1):** Cập nhật ngày hiệu lực bảng chiết khấu hiện hành; bổ sung quy tắc tính mốc giờ trung gian (nếu chưa tới mốc kế tiếp thì tính theo mốc thấp hơn liền kề); làm rõ điều kiện cao điểm sáng 7h–9h (yêu cầu 10h/tuần tức phải chạy đủ cả 5 ngày trong tuần).
  + **Quy định & Kỷ luật (Mục 2):** Đồng bộ quy trình báo vào ca trễ và giải thích rõ khái niệm "mở pin tăng ca"; làm rõ bậc thang xử phạt thiếu ảnh (tính cộng dồn theo tuần) và bổ sung mức phạt thiếu ảnh ≥ 20%; chốt giá ưu đãi áo đồng phục "trong tuần đầu tiên thử việc" (chưa bắt buộc có áo ngay), điều chỉnh chế tài cởi áo giữa ca (xóa giờ ca đó thay vì xóa cả tuần); thêm ngoại lệ cấm chở người ("trừ khách đơn xe ôm"); thêm cảnh báo an toàn khi bot random check (dừng xe an toàn rồi mới chụp ảnh); cập nhật ranh giới hành chính nội ô Cần Thơ (phường Ninh Kiều, Cái Khế, Tân An, An Bình); thêm điều kiện miễn trừ xóa giờ khi cả ca không có đơn nếu shipper duy trì định vị chuẩn suốt ca; ẩn link mời công khai 2 nhóm Telegram, thay bằng quy trình duyệt cấp quyền bảo mật.
  + **Hướng dẫn thao tác (Mục 5):** Phân định rõ 2 kênh vào ca (kênh chuẩn trên App và kênh Telegram báo vào ca trễ); đồng bộ tên ô tiền "Tiền ứng hàng" (trên app ghi là "Tiền ship hiện có"); viết lại quy trình giật đơn box chung và xin đơn còn lại sau 20s mạch lạc, dễ hiểu.
  + **Hỗ trợ & Khiếu nại (Mục 8):** Bổ sung kênh liên hệ hỗ trợ chính thức qua mục Chat trên App trong khung giờ hoạt động từ 7h00 đến 22h00 hàng ngày; hoàn thiện Quy trình khiếu nại minh bạch khi bị phạt sai (kênh tiếp nhận, thông tin cung cấp, thời hạn xử lý 24h–48h và hoàn tiền 100% nếu do lỗi khách quan); điều chỉnh nội dung trao đổi ban đầu để không mâu thuẫn với quyền khiếu nại.
