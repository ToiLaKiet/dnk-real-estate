import '../../styles/App.css';
import Logo from '../../components/logo.js';
import React, { useState } from 'react'; // Thêm useState
import '../../styles/Gioithieu.css';
import { FaAngleRight } from "react-icons/fa";

function Gioithieu() {
  // State để lưu chỉ số của mục được chọn
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Danh sách nội dung tương ứng với từng mục
  const contents = [
    {
      title: "Về chúng tôi",
      text: (
        <>
          <p>Chào mừng bạn đến với <b>DNK Real Estate</b> – nền tảng bất động sản tiên phong và đáng tin cậy hàng đầu tại Việt Nam! Chúng tôi tự hào là điểm đến lý tưởng cho mọi nhu cầu liên quan đến bất động sản, từ việc tìm kiếm ngôi nhà mơ ước, cơ hội đầu tư sinh lời bền vững, đến việc hỗ trợ bạn bán hoặc cho thuê tài sản một cách nhanh chóng và hiệu quả. Với sứ mệnh kiến tạo một thị trường bất động sản minh bạch, hiện đại và gần gũi hơn với người dùng, DNK Real Estate không chỉ là một website, mà còn là người bạn đồng hành tận tâm trên hành trình khám phá thế giới bất động sản đầy tiềm năng của bạn.</p>
                <p>DNK Real Estate ra đời từ khát vọng mang lại sự thay đổi tích cực cho ngành bất động sản tại Việt Nam – một lĩnh vực vốn đóng vai trò quan trọng trong đời sống kinh tế và xã hội. Chúng tôi nhận thấy rằng, trong một thị trường rộng lớn và đa dạng như Việt Nam, người mua, người bán và nhà đầu tư thường gặp phải những thách thức như thông tin thiếu minh bạch, quy trình giao dịch phức tạp, hoặc khó khăn trong việc tiếp cận các cơ hội thực sự giá trị. Chính vì vậy, chúng tôi đã xây dựng DNK Real Estate như một giải pháp toàn diện, nơi mọi người có thể dễ dàng tìm thấy những gì mình cần, với sự hỗ trợ tối đa từ đội ngũ chuyên gia và công nghệ tiên tiến.</p>
                <p>Chúng tôi là ai? DNK Real Estate không chỉ đơn thuần là một công ty công nghệ bất động sản, mà còn là tập hợp của những con người đam mê, giàu kinh nghiệm và luôn đặt lợi ích của khách hàng lên hàng đầu. Đội ngũ của chúng tôi bao gồm các chuyên gia tư vấn bất động sản với hàng chục năm kinh nghiệm trên thị trường, các nhà phân tích dữ liệu am hiểu sâu sắc về xu hướng, cùng đội ngũ kỹ sư công nghệ không ngừng sáng tạo để mang đến trải nghiệm mượt mà, thân thiện cho người dùng. Mỗi thành viên tại DNK Real Estate đều mang trong mình một sứ mệnh chung: giúp bạn biến giấc mơ về một tổ ấm hoàn hảo hoặc một khoản đầu tư sinh lời thành hiện thực.</p>
                <p>Tại DNK Real Estate, chúng tôi cung cấp một hệ sinh thái dịch vụ toàn diện, đáp ứng mọi nhu cầu của bạn trong lĩnh vực bất động sản. Bạn đang tìm kiếm một căn hộ chung cư tiện nghi giữa trung tâm thành phố? Hay một mảnh đất nền tiềm năng ở vùng ven để đầu tư lâu dài? Hoặc bạn muốn bán nhanh ngôi nhà của mình với mức giá tốt nhất? Dù nhu cầu của bạn là gì, DNK Real Estate luôn sẵn sàng hỗ trợ. Website của chúng tôi được thiết kế với giao diện thân thiện, dễ sử dụng, tích hợp công nghệ tìm kiếm thông minh để bạn có thể tiếp cận hàng ngàn bất động sản chỉ trong vài giây. Bên cạnh đó, chúng tôi liên tục cập nhật thông tin về các dự án mới, xu hướng thị trường, phân tích chuyên sâu và những tin tức nóng hổi để bạn luôn nắm bắt được những cơ hội vàng.</p>
                <p>Một trong những điểm nổi bật của DNK Real Estate là cam kết về sự minh bạch và chính xác trong mọi thông tin mà chúng tôi cung cấp. Chúng tôi hiểu rằng bất động sản không chỉ là một giao dịch tài chính, mà còn là nơi gắn kết cảm xúc, nơi bạn xây dựng tổ ấm hoặc đặt nền móng cho tương lai. Vì vậy, mỗi tin đăng trên DNK Real Estate đều được kiểm duyệt kỹ lưỡng, đảm bảo thông tin về giá cả, vị trí, pháp lý và tình trạng thực tế của tài sản là hoàn toàn trung thực. Chúng tôi không chỉ kết nối người mua với người bán, mà còn tạo ra một không gian giao dịch an toàn, nơi bạn có thể yên tâm đưa ra quyết định.</p>
                <p>DNK Real Estate không ngừng nỗ lực để trở thành cầu nối vững chắc giữa các bên trong thị trường bất động sản. Chúng tôi hợp tác với hàng loạt chủ đầu tư uy tín, các công ty môi giới chuyên nghiệp và những cá nhân sở hữu tài sản trên khắp Việt Nam để mang đến danh mục bất động sản đa dạng, từ căn hộ cao cấp, nhà phố, biệt thự ven biển, đến đất nền tại các khu vực phát triển tiềm năng. Sự đa dạng này cho phép chúng tôi phục vụ nhiều đối tượng khách hàng khác nhau, từ những người mua nhà lần đầu tiên với ngân sách hạn chế, đến các nhà đầu tư kỳ cựu tìm kiếm cơ hội sinh lời cao.</p>
                <p>Chúng tôi cũng tự hào về tầm nhìn dài hạn của mình. DNK Real Estate không chỉ dừng lại ở việc cung cấp dịch vụ đăng tin hay tìm kiếm bất động sản, mà còn hướng tới việc xây dựng một cộng đồng gắn kết, nơi mọi người có thể chia sẻ kinh nghiệm, kiến thức và cơ hội trong lĩnh vực này. Thông qua các bài viết phân tích chuyên sâu, hướng dẫn mua bán bất động sản, và các buổi hội thảo trực tuyến, chúng tôi mong muốn trang bị cho khách hàng những hiểu biết cần thiết để đưa ra quyết định sáng suốt. Đây không chỉ là một dịch vụ, mà còn là cách chúng tôi thể hiện trách nhiệm với cộng đồng và đóng góp vào sự phát triển bền vững của thị trường bất động sản Việt Nam.</p>
                <p>Văn hóa của DNK Real Estate được xây dựng dựa trên ba giá trị cốt lõi: Uy tín – Chuyên nghiệp – Tận tâm. Uy tín là nền tảng để chúng tôi tạo dựng niềm tin với khách hàng, từ việc cung cấp thông tin chính xác đến việc đảm bảo mọi giao dịch diễn ra suôn sẻ. Chuyên nghiệp được thể hiện qua cách chúng tôi vận hành, từ đội ngũ nhân sự được đào tạo bài bản đến hệ thống công nghệ tối ưu hóa trải nghiệm người dùng. Và tận tâm là lời cam kết mà chúng tôi dành cho từng khách hàng – dù bạn là cá nhân hay doanh nghiệp, chúng tôi luôn lắng nghe, thấu hiểu và hỗ trợ bạn hết mình.</p>
                <p>Nhìn về tương lai, DNK Real Estate đặt mục tiêu trở thành nền tảng bất động sản số một tại Việt Nam, không chỉ về quy mô mà còn về chất lượng dịch vụ. Chúng tôi đang không ngừng đổi mới, ứng dụng các công nghệ tiên tiến như trí tuệ nhân tạo (AI), dữ liệu lớn (Big Data) và thực tế ảo (VR) để mang đến trải nghiệm độc đáo cho người dùng. Chẳng hạn, bạn có thể tham quan một căn nhà qua công nghệ VR mà không cần đến tận nơi, hoặc nhận được gợi ý bất động sản phù hợp dựa trên sở thích cá nhân nhờ thuật toán AI thông minh. Đây là cách chúng tôi tiên phong trong việc đưa bất động sản Việt Nam hội nhập với xu hướng toàn cầu.</p>
                <p>Cuối cùng, DNK Real Estate không chỉ là một website, mà còn là một lời hứa. Chúng tôi hứa sẽ luôn đồng hành cùng bạn, từ những bước đầu tiên trong việc tìm kiếm bất động sản, đến khi bạn hoàn tất giao dịch và bắt đầu một hành trình mới. Dù bạn là ai – một gia đình trẻ tìm kiếm tổ ấm, một nhà đầu tư tìm kiếm cơ hội, hay một người muốn bán tài sản để chuyển sang chương mới của cuộc đời – chúng tôi đều ở đây để giúp bạn đạt được mục tiêu. Hãy để DNK Real Estate trở thành người bạn đồng hành đáng tin cậy của bạn, cùng khám phá và chinh phục thế giới bất động sản đầy tiềm năng!</p>
                <p><i><b>Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, đừng ngần ngại liên hệ với chúng tôi qua <u>dnkrealestate@gmail.com</u>. DNK Real Estate luôn sẵn sàng!</b></i></p>
        </>
      ),
    },
    {
      title: "Quy định đăng tin",
      text: (
        <>
        <p><b>Chào mừng bạn đến với DNK Real Estate – nền tảng kết nối bất động sản đáng tin cậy!</b></p>
          <p>Để đảm bảo website của chúng tôi hoạt động hiệu quả, minh bạch và mang lại giá trị tối ưu cho người dùng, chúng tôi đã thiết lập các quy định đăng tin cụ thể.</p>
          <p>Những quy định này áp dụng cho tất cả cá nhân, tổ chức sử dụng dịch vụ đăng tin trên website DNK Real Estate.</p>
          <p>Vui lòng đọc kỹ và tuân thủ để đảm bảo trải nghiệm tốt nhất cho bạn và cộng đồng.</p>
        <h2>1. Đối tượng được phép đăng tin</h2>
          <p><b>Cá nhân:</b> Người dùng từ 18 tuổi trở lên, có đầy đủ năng lực hành vi dân sự theo pháp luật Việt Nam, được phép đăng tin bất động sản thuộc sở hữu của mình hoặc được ủy quyền hợp pháp.</p>
          <p><b>Doanh nghiệp:</b> Các công ty, tổ chức hoạt động trong lĩnh vực bất động sản, môi giới hoặc liên quan, đã đăng ký tài khoản doanh nghiệp tại DNK Real Estate.</p>
        <p>Tất cả người dùng cần cung cấp thông tin chính xác khi đăng ký tài khoản, bao gồm họ tên, số điện thoại, email và các giấy tờ xác minh (nếu được yêu cầu).</p>
        <h2>2. Nội dung tin đăng</h2>
        <p><b>Thông tin chính xác:</b> Tin đăng cần phản ánh đúng tình trạng thực tế của bất động sản.</p>
        <p><b>Hình ảnh minh họa:</b> Mỗi tin đăng cần có ít nhất 3 hình ảnh thực tế.</p>
        <p><b>Tiêu đề tin đăng:</b> Ngắn gọn, rõ ràng, không sử dụng từ ngữ gây hiểu lầm hoặc phóng đại.</p>
        <p><b>Mô tả chi tiết:</b> Cung cấp đầy đủ thông tin về bất động sản.</p>
        <h2>3. Các hành vi bị cấm</h2>
        <p>Để duy trì môi trường giao dịch lành mạnh, chúng tôi nghiêm cấm các hành vi sau:</p>
        <p>-Đăng tin trùng lặp hoặc sao chép.</p>
        <p>-Đăng thông tin sai sự thật.</p>
        <p>-Sử dụng từ ngữ thô tục.</p>
        <p>-Đăng tin quảng cáo không liên quan.</p>
        <h2>4. Quy trình đăng tin</h2>
        <p><b>Bước 1:</b> Đăng nhập vào tài khoản.</p>
        <p><b>Bước 2:</b> Chọn mục "Đăng tin" và điền thông tin.</p>
        <p><b>Bước 3:</b> Tải lên hình ảnh và kiểm tra lại.</p>
        <p><b>Bước 4:</b> Tin sẽ được kiểm duyệt trong 24 giờ.</p>
        <h2>5. Chi phí đăng tin</h2>
        <p><b>Tin miễn phí:</b> Tối đa 2 tin/tháng, hiển thị 15 ngày.</p>
        <p><b>Tin VIP:</b> Có mức giá từ 100.000 VNĐ đến 500.000 VNĐ/tin.</p>
        <h2>6. Quyền và nghĩa vụ của người đăng tin</h2>
        <p><b>Quyền:</b> Người dùng có quyền yêu cầu hỗ trợ từ DNK Real Estate.</p>
        <p><b>Nghĩa vụ:</b> Tuân thủ mọi quy định của website.</p>
        <h2>7. Xử lý vi phạm</h2>
        <p><b>Lần 1:</b> Cảnh cáo.</p>
        <p><b>Lần 2:</b> Khóa tài khoản 7 ngày.</p>
        <p><b>Lần 3:</b> Khóa vĩnh viễn.</p>
        <h2>8. Liên hệ hỗ trợ</h2>
        <p><b>Email:</b> dnkrealestate@gmail.com</p>
        <p><b>Hotline:</b> 0909.299.111 (hoạt động từ 8:00 – 17:00, thứ 2 – thứ 7)</p>
        <p><b><i>DNK Real Estate mong muốn mang đến một nền tảng giao dịch bất động sản minh bạch và hiệu quả.</i></b></p>
                </>
              ),
    },
    {
      title: "Điều khoản thoả thuận",
      text: (
        <>
          <p>
            Trước hết, chúng tôi xin chân thành cám ơn các bạn đã quan tâm và có mong muốn sử dụng dịch vụ của chúng tôi. Trước khi bắt đầu tham quan DNK Real Estate cũng như sử dụng các dịch vụ trên trang website, xin vui lòng đọc cẩn thận và ghi nhớ Điều khoản Thoả thuận này. Việc sử dụng hoặc truy cập vào website DNK Real Estate sẽ được hiểu là sự chấp nhận và đồng ý ràng buộc vào Điều khoản Thoả thuận.
          </p>
    
          <h2>Điều Khoản Thoả Thuận truy cập website DNK Real Estate</h2>
    
          <p>
            Điều khoản Thoả thuận này được ký kết bởi và giữa DNK Real Estate với bất kỳ một cá nhân, tổ chức hoặc một thực thể nào khác, những người truy cập hoặc sử dụng website DNK Real Estate (được gọi chung là "Người sử dụng” hoặc "bạn").
          </p>
          <p>
            DNK Real Estate là website được thiết kế cho phép thông tin về bất động sản và các lĩnh vực liên quan, bao gồm cả việc những người sử dụng đăng thông tin quảng cáo nhu cầu mua/bán/thuê/cho thuê bất động sản do những người sử dụng khác đăng lên, hoặc tương tác với những người sử dụng đó. DNK Real Estate chứa hoặc có thể chứa các thông tin, tin tức, các ý kiến, văn bản, đồ hoạ, các liên kết, sản phẩm nghệ thuật điện tử, hình ảnh động, âm thanh, video, phần mềm, tranh ảnh, âm nhạc, tiếng động và các nội dung, dữ liệu khác (gọi chung là "nội dung") được định dạng, tổ chức và thu thập dưới nhiều hình thức khác nhau mà người sử dụng có thể truy cập tới được, gồm thông tin trên website của DNK Real Estate mà người sử dụng có thể thay đổi được, chẳng hạn như đăng thông tin quảng cáo mua/bán/thuê/cho thuê bất động sản, tải lên các tập tin đa phương tiện.
          </p>
    
          <h3>1. Trách nhiệm và hạn chế đối với Người sử dụng</h3>
          <h4>1.1 Trách nhiệm của Người sử dụng</h4>
          <p>
            Bạn đồng ý chỉ truy cập và dùng website DNK Real Estate với các mục đích hợp pháp. Bạn có trách nhiệm về việc hiểu biết và tuân thủ mọi điều luật, các quy chế, quy tắc và các quy định gắn liền với:
          </p>
          <p>(i) việc bạn sử dụng website DNK Real Estate, kể cả vùng tương tác bất kỳ,</p>
          <p>(ii) việc sử dụng mạng hay dịch vụ nào khác có kết nối tới website DNK Real Estate,</p>
          <p>(iii) phương tiện liên lạc mà nhờ đó, bạn nối môđem, máy tính hoặc các thiết bị khác của bạn tới website DNK Real Estate.</p>
          <p>
            Bằng việc cung cấp thông tin bao gồm nhưng không giới hạn số điện thoại, email khi đăng ký tài khoản thành viên hay các trường thu thập thông tin trên website DNK Real Estate, bạn đồng ý nhận các cuộc gọi, tin nhắn, email từ DNK Real Estate bao gồm không giới hạn các nội dung liên quan đến chăm sóc khách hàng, giới thiệu, quảng cáo dịch vụ của DNK Real Estate cũng như các sản phẩm, dịch vụ của cổ đông sở hữu, công ty liên kết, đơn vị thành viên, khách hàng của công ty sở hữu website DNK Real Estate.
          </p>
          <p>
            Bạn đồng ý rằng hành động duy nhất thể hiện yêu cầu của bạn về việc đề nghị DNK Real Estate chấm dứt thực hiện cuộc gọi, gửi tin nhắn, gửi email đến bạn đó là xóa tài khoản thành viên trên DNK Real Estate theo Quy chế hoạt động của website DNK Real Estate hoặc gửi yêu cầu bằng văn bản hoặc hình thức khác tương đương tới DNK Real Estate.
          </p>
    
          <h4>1.2. Hạn chế đối với Người sử dụng</h4>
          <p>
            Truy cập tới website DNK Real Estate, bạn đồng ý sẽ không:
          </p>
          <p>Sử dụng bất kỳ thiết bị, phần mềm, quy trình, phương tiện để can thiệp hay cố gắng can thiệp vào các hoạt động kinh doanh trên DNK Real Estate;</p>
          <p>Hạn chế hoặc ngăn cản người sử dụng khác sử dụng và hưởng các tính năng tương tác;</p>
          <p>Thực hiện bất kỳ hành động mà sẽ áp đặt một gánh nặng hoặc làm cho lưu lượng truy cập vào cơ sở hạ tầng của DNK Real Estate quá nhiều mà chúng tôi cho là không hợp lý hay không cân xứng với cách sử dụng DNK Real Estate;</p>
          <p>Gửi hoặc chuyển các thông tin bất hợp pháp, đe doạ, lạm dụng, bôi nhọ, nói xấu, khiêu dâm, phi thẩm mỹ, xúc phạm hoặc bất kỳ loại thông tin không đúng đắn, bao gồm truyền bá tin tức góp phần hay khuyến khích hành vi phạm tội, gây ra trách nhiệm pháp lý dân sự hoặc vi phạm luật bất kỳ của một địa phương, bang, quốc gia, hay luật quốc tế nào;</p>
          <p>Gửi hay chuyển các thông tin, phần mềm, hoặc các tài liệu khác bất kỳ, vi phạm hoặc xâm phạm các quyền của những người khác, trong đó bao gồm cả tài liệu xâm phạm đến quyền riêng tư hoặc công khai, hoặc tài liệu được bảo vệ bản quyền, tên thương mại hoặc quyền sở hữu khác, hoặc các sản phẩm phái sinh mà không được sự cho phép của người chủ sở hữu hoặc người có quyền hợp pháp;</p>
          <p>Gửi hoặc chuyển thông tin, phần mềm hoặc tài liệu bất kỳ có chứa virus hoặc một thành phần gây hại khác;</p>
          <p>Thay đổi, làm hư hại, xoá nội dung bất kỳ hoặc các phương tiện khác mà không phải là nội dung thuộc sở hữu của bạn; hoặc gây trở ngại cho những người khác truy cập tới website DNK Real Estate;</p>
          <p>Gửi hoặc chuyển thư rác, thông tin về các cuộc thi, thông tin khảo sát, hoặc nhắn tin đại chúng khác, cho dù với mục đích thương mại hay không;</p>
          <p>Phá vỡ luồng thông tin bình thường trong một tương tác;</p>
          <p>Tuyên bố có liên hệ với hay phát ngôn cho một doanh nghiệp, hiệp hội, thể chế hay tổ chức nào khác mà bạn không được uỷ quyền tuyên bố mối liên hệ đó;</p>
          <p>Vi phạm một quy tắc, chính sách hay hướng dẫn sử dụng nào của nhà cung cấp dịch vụ Internet cho bạn hay các dịch vụ trực tuyến;</p>
          <p>
            Khi có hành vi vi phạm các quy định nêu trên, chúng tôi có quyền thực hiện bất kỳ hành động hợp pháp nào mà chúng tôi cho là cần thiết để ngăn chặn sự truy cập, sử dụng trái phép website DNK Real Estate, bao gồm việc sử dụng rào cản công nghệ, hoặc báo cáo về hành vi của bạn tới cơ quan nhà nước có thẩm quyền.
          </p>
    
          <h3>2. Các quyền sở hữu trí tuệ</h3>
          <p>
            Bạn thừa nhận nội dung trên website DNK Real Estate nói chung do DNK Real Estate, cộng tác viên cá nhân về nội dung ("Cộng tác viên"), người được cấp phép thứ ba, và/hoặc những người sử dụng khác cung cấp. Bạn thừa nhận website DNK Real Estate cho phép truy cập tới Nội dung được bảo vệ bản quyền, tên thương mại và các quyền sở hữu khác (kể cả quyền sở hữu trí tuệ) ("Quyền Sở hữu Trí tuệ"), và thừa nhận các quyền sở hữu trí tuệ đó là hợp lệ và được bảo vệ trên mọi phương tiện truyền thông hiện có và sau này, trừ những điểm nêu rõ ràng dưới đây, việc sử dụng nội dung của Bạn sẽ được quản lý theo luật sở hữu trí tuệ và các văn bản pháp luật liên quan hiện hành khác.
          </p>
          <p>
            Bạn không thể thay đổi, sao chép, mô phỏng, truyền, phân phối, công bố, tạo ra các sản phẩm phái sinh, hiển thị hoặc chuyển giao, hoặc khai thác nhằm mục đích thương mại bất kỳ phần nào của nội dung, toàn bộ hay từng phần, mặc dù bạn có thể:
          </p>
          <p>(i) tạo một số lượng hợp lý các bản sao dưới dạng số hoặc hình thức khác để phần cứng và phần mềm máy tính của bạn có thể truy cập và xem được nội dung,</p>
          <p>(ii) in một bản sao của từng đoạn nội dung,</p>
          <p>(iii) tạo và phân phối một số lượng hợp lý các bản sao nội dung, toàn bộ hay từng phần, ở dạng bản in hoặc bản điện tử để dùng nội bộ.</p>
          <p>
            Bất kỳ bản sao nội dung được phép nào cũng phải được tái tạo ở dạng không thể biến đổi được các thông tin bất kỳ chứa trong nội dung, chẳng hạn như tất cả các thông tin về Quyền Sở hữu Trí tuệ, và các nguồn thông tin ban đầu cho “website DNK Real Estate” và địa chỉ mạng (URL) của nó. Bạn thừa nhận, website DNK Real Estate, các cộng tác viên, và/hoặc những người sử dụng vẫn là những người chủ sở hữu của nội dung và rằng, bạn sẽ không có bất kỳ Quyền Sở hữu Trí tuệ nào qua việc tải xuống hoặc in nội dung.
          </p>
    
          <h4>Nội dung do Người sử dụng cung cấp</h4>
          <p>
            Bạn chỉ có thể tải lên vùng tương tác bất kỳ hoặc truyền, gửi, công bố, mô phỏng hoặc phân phối trên hoặc thông qua website DNK Real Estate phần nội dung, không phụ thuộc vào bất kỳ Quyền Sở hữu Trí tuệ nào, hoặc nội dung mà người giữ Quyền Sở hữu Trí tuệ có sự ủy quyền rõ ràng về việc phân tán trên Internet và trên website DNK Real Estate mà không có hạn chế gì. Mọi nội dung được đưa ra với sự đồng ý của người sở hữu bản quyền không phải là bạn phải kèm theo câu như “do [tên người chủ sở hữu] sở hữu bản quyền; được dùng theo ủy quyền”.
          </p>
          <p>
            Với việc đưa nội dung lên vùng tương tác bất kỳ, bạn tự động chấp nhận và/hoặc cam đoan rằng, chủ sở hữu của nội dung đó, hoặc là bạn, hoặc là nhóm thứ ba, đã cho website DNK Real Estate quyền và giấy phép không phải trả tiền bản quyền, lâu dài, không thay đổi, không loại trừ, không hạn chế để sử dụng, mô phỏng, thay đổi, sửa lại, công bố, dịch thuật, tạo các sản phẩm phái sinh, cấp phép con, phân phối, thực hiện và hiển thị nội dung đó, toàn phần hay từng phần, khắp thế giới và/hoặc kết hợp nó với các công việc khác ở dạng bất kỳ, qua các phương tiện truyền thông hoặc công nghệ hiện tại hay sẽ phát triển sau này theo điều khoản đầy đủ của Quyền Sở hữu Trí tuệ bất kỳ trong nội dung đó. Bạn cũng cho phép website DNK Real Estate cấp giấy phép con cho bên thứ ba quyền không hạn chế để thực hiện bất kỳ quyền nào ở trên với nội dung đó. Bạn cũng cho phép người dùng truy cập, xem, lưu và mô phỏng lại nội dung để sử dụng riêng. Bạn cũng cho phép website DNK Real Estate dùng tên và logo công ty/cá nhân vì các mục đích tiếp thị.
          </p>
    
          <h3>3. Các vùng tương tác</h3>
          <p>
            Bạn thừa nhận, website DNK Real Estate có thể chứa các vùng tương tác khác nhau. Những vùng tương tác này cho phép phản hồi tới website DNK Real Estate và tương tác thời gian thực giữa những người sử dụng. Bạn cũng hiểu rằng, website DNK Real Estate không kiểm soát các thông báo, thông tin hoặc các tập tin được phân phối tới các vùng tương tác như vậy và rằng, website DNK Real Estate có thể cho bạn và những người sử dụng khác khả năng tạo và quản lý một vùng tương tác.
          </p>
          <p>
            Tuy nhiên, website DNK Real Estate, công ty mẹ, hoặc các chi nhánh, cũng như các giám đốc, nhân viên, những người làm thuê và các đại lý tương ứng không chịu trách nhiệm về nội dung trong vùng tương tác bất kỳ. Việc sử dụng và quản lý một vùng tương tác của bạn sẽ bị chi phối bởi Điều khoản Thoả thuận này và các quy tắc bổ sung bất kỳ, hoặc bởi các thủ tục hoạt động của vùng tương tác bất kỳ do bạn hay người sử dụng khác thiết lập. Bạn công nhận rằng, website DNK Real Estate không thể và không có ý định sàng lọc các thôngtin trước. Ngoài ra, vì website DNK Real Estate khuyến khích liên lạc mở và không thiên vị trong các vùng tương tác nên website DNK Real Estate không thể xác định trước mức độ chính xác hoặc sự phù hợp đối với Điều khoản Thoả thuận này về nội dung bất kỳ được chuyển đi trong vùng tương tác.
          </p>
          <p>
            Website DNK Real Estate không chịu trách nhiệm với việc sàng lọc, lập chính sách, hiệu chỉnh, duyệt hoặc giám sát nội dung bất kỳ trong một vùng tương tác. Mặc dù vậy, bạn cũng đồng ý rằng website DNK Real Estate có quyền giám sát mọi vùng tương tác, đôi lúc để lộ thông tin nào đó nếu cần thiết theo yêu cầu luật pháp, hoặc yêu cầu khác của chính phủ đối với hoạt động của vùng tương tác, hoặc để tự bảo vệ mình hay những người sử dụng khác. Nếu được thông báo nội dung dẫn ra không phù hợp với bản Thỏa thuận này, website DNK Real Estate có thể thận trọng kiểm tra và xác định để loại bỏ, hoặc yêu cầu người sử dụng bỏ nội dung đó. Website DNK Real Estate giữ quyền cấm các hành động, truyền đạt tin tức hoặc nội dung trong phạm vi vùng tương tác, hoặc soạn thảo, từ chối gửi, hoặc loại bỏ nội dung bất kỳ, toàn thể hay từng phần mà với đặc quyền của mình, chúng tôi cho rằng:
          </p>
          <p>(i) vi phạm các điều khoản của Thỏa thuận này hoặc bất kỳ điều khoản khác nằm trong chính sách của DNK Real Estate có hiệu lực vào lúc đó,</p>
          <p>(ii) bất lợi với các quyền của mọi người sử dụng, của website DNK Real Estate hoặc các nhóm thứ ba khác,</p>
          <p>(iii) vi phạm pháp luật hiện hành hoặc</p>
          <p>(iv) những điều không đúng thuần phong mỹ tục.</p>
    
          <h3>4. Chấm dứt</h3>
          <p>
            Quyền của bạn khi không thỏa mãn, không đồng ý với mọi chính sách, nguyên tắc thực hiện hay hành động thực tiễn của website DNK Real Estate trong điều hành website DNK Real Estate, hoặc mọi thay đổi về nội dung là dừng sự truy cập tới website DNK Real Estate. Website DNK Real Estate có thể chấm dứt hoặc tạm thời ngưng sự truy cập của bạn đến tất cả hay bất kỳ phần nào của website DNK Real Estate mà không thông báo với Ban về các hành động khi DNK Real Estate tin rằng, đó là vi phạm Điều khoản Thỏa thuận này hoặc vi phạm chính sách hay nguyên tắc thực hiện mà website DNK Real Estate đã đưa ra, hoặc với các hành động khác mà chúng tôi tin rằng có hại đến website DNK Real Estate và những người sử dụng khác.
          </p>
          <p>
            Website DNK Real Estate với đặc quyền riêng có thể đình chỉ sự hoạt động của nó và chấm dứt Điều khoản Thoả thuận này mà không thông báo vào bất kỳ lúc nào và vì bất kỳ lý do nào theo đặc quyền của mình. Trong trường hợp chấm dứt, bạn không còn được phép truy cập đến website DNK Real Estate nữa, kể cả các vùng tương tác và các hạn chế của bạn về nội dung được tải xuống từ DNK Real Estate, cũng như những từ chối về quyền lợi và các giới hạn về các trách nhiệm pháp lý được nêu ra trong thỏa thuận này, vẫn còn giá trị.
          </p>
    
          <h3>5. Các liên kết</h3>
          <p>
            Bạn hiểu rằng trừ phần nội dung, các sản phẩm và dịch vụ có trên website DNK Real Estate, công ty mẹ, hoặc các chi nhánh, cũng như các giám đốc, nhân viên, người làm công và các đại lý tương ứng kiểm soát, cung cấp không chịu trách nhiệm với nội dung, hàng hóa hoặc các dịch vụ của các sites khác trên Internet được kết nối tới hoặc từ website DNK Real Estate. Tất cả nội dung, hàng hóa và các dịch vụ đó đều có thể truy cập được trên Internet bởi bên thứ ba độc lập và không phải là một phần của website DNK Real Estate hoặc được kiểm soát bởi DNK Real Estate. Website DNK Real Estate không xác nhận và cũng không chịu trách nhiệm về tính chính xác, tính đầy đủ, tính hữu dụng, chất lượng và tính sẵn sàng của mọi nội dung, hàng hóa hay các dịch vụ có trên các site được kết nối tới hoặc từ website DNK Real Estate mà đó là trách nhiệm duy nhất của bên thứ ba độc lập đó, và do vậy việc sử dụng của bạn là sự mạo hiểm riêng của bạn.
          </p>
          <p>
            Website DNK Real Estate, côngty mẹ, hoặc các chi nhánh, hoặc các giám đốc, nhân viên, người làm công và các đại lý tương ứng không chịu trách nhiệm pháp lý, trực tiếp hay gián tiếp, với mọi mất mát hay thiệt hại gây ra bởi hoặc bị cho là gây ra bởi việc sử dụng hoặc sự tin cậy của bạn vào mọi nội dung, hàng hóa hoặc các dịch vụ có trên site bất kỳ được kết nối đến hoặc từ website DNK Real Estate, hoặc do bạn không thể truy cập lên Internet hay site bất kỳ kết nối đến hoặc từ website DNK Real Estate.
          </p>
    
          <h3>6. Bồi thường</h3>
          <p>
            Bạn đồng ý trả tiền và miễn cho website DNK Real Estate, công ty mẹ và các chi nhánh, các giám đốc, nhân viên, những người làm công và các đại lý tương ứng tất cả các trách nhiệm pháp lý, các quyền được đòi hỏi và các phí tổn, kể cả các phí hợp lý cho luật sư, nảy sinh từ sự vi phạm Điều khoản Thoả thuận này, từ chính sách bất kỳ khác, từ việc sử dụng hay truy cập của bạn tới website DNK Real Estate hoặc site internet được kết nối đến hoặc từ website DNK Real Estate, hoặc về việc truyền nội dung bất kỳ trên website DNK Real Estate.
          </p>
    
          <h3>7. Thanh toán dịch vụ đăng tin giữa Người đăng tin và DNK Real Estate</h3>
          <p>
            DNK Real Estate sẽ công khai biểu giá dịch vụ và phương thức thanh toán dịch vụ trên website DNK Real Estate. Theo đó, các thành viên có thể tìm hiểu, lựa chọn dịch vụ và phương thức thanh toán dịch vụ phù hợp.
          </p>
    
          <h3>8. Thanh toán giao dịch mua/bán/cho thuê/thuê Bất động sản</h3>
          <p>
            Người đăng tin và người mua/bán/cho thuê/thuê/các thành viên tự trao đổi, thỏa thuận các nội dung và điều kiện thanh toán bất động sản (nếu có). DNK Real Estate không tham gia vào quy trình thanh toán hay bất kỳ hoạt động, nội dung thỏa thuận nào trong giao dịch giữa hai bên.
          </p>
          <p>
            Do quá trình giao dịch bất động sản không được thực hiện thông qua DNK Real Estate nên DNK Real Estate khuyến nghị Người đăng tin và người mua/bán/cho thuê/thuê hoặc các bên có nhu cầu tự thỏa thuận phương thức giao dịch và thanh toán theo quy định của pháp luật. DNK Real Estate khuyến nghị các bên có nhu cầu thực hiện thanh toán các giao dịch bất động sản qua các hình thức đảm bảo như thanh toán chuyển khoản ngân hàng (ủy nhiệm chi) dựa trên hợp đồng, hóa đơn, chứng từ pháp lý khác làm cơ sở cho việc giải quyết tranh chấp, khiếu nại (nếu có).
          </p>
    
          <h3>9. Các vấn đề khác</h3>
          <p>
            Quyền và trách nhiệm của thành viên, Người sử dụng trên website DNK Real Estate cũng như liên quan đến các nội dung và vấn đề khác sẽ được thực hiện theo chính sách, quy chế hoạt động sàn giao dịch thương mại điện tử DNK Real Estate.
          </p>
          <p>
            Điều khoản Thoả thuận này bao gồm toàn bộ sự thoả thuận giữa website DNK Real Estate và bạn, và thay thế mọi thoả thuận trước đây về chủ đề này. Website DNK Real Estate có thể xét lại Điều khoản Thoả thuận này hoặc mọi chính sách khác vào bất cứ lúc nào, sự sửa đổi này sẽ có hiệu lực trong năm (05) ngày nhờ gửi thông báo về sự xem xét lại đó ở nơi dễ thấy trên website DNK Real Estate. Bạn đồng ý xem xét lại Điều khoản Thoả thuận này định kỳ để hiểu về những điều đã được sửa lại. Nếu bạn không chấp nhận các sửa đổi này, bạn phải dừng truy cập tới website DNK Real Estate. Sự tiếp tục truy cập của bạn và việc sử dụng website DNK Real Estate sau thông báo về mọi sửa đổi như vậy sẽ được coi là sự chấp nhận tất cả các sự sửa đổi này.
          </p>
          <p>
            Việc website DNK Real Estate không thể đòi hỏi hoặc buộc thực hiện chặt chẽ mọi điều khoản của Điều khoản Thoả thuận này sẽ không được coi là sự khước từ điều khoản hay quyền bất kỳ.
          </p>
    
          <p>
            Xin cảm ơn Bạn đã dành thời gian đọc bản Thỏa thuận này, và một lần nữa xin cám ơn Bạn đã truy cập, sử dụng dịch vụ của chúng tôi. Hy vọng rằng những thông tin trên DNK Real Estate sẽ hữu ích đối với Bạn.
          </p>
        </>
      ),
    },
    {
      title: "Chính sách bảo mật",
      text: (
        <>
          <p><i>Cập nhật lần cuối: Ngày 22 tháng 03 năm 2025</i></p>
    
          <p>
            Chào mừng bạn đến với DNK Real Estate – nền tảng trực tuyến cung cấp dịch vụ tư vấn, môi giới và thông tin bất động sản đáng tin cậy. Tại DNK Real Estate, chúng tôi hiểu rằng quyền riêng tư và bảo mật thông tin là mối quan tâm hàng đầu của khách hàng khi sử dụng các dịch vụ trực tuyến. Vì vậy, chúng tôi cam kết bảo vệ thông tin cá nhân của bạn một cách tối đa, tuân thủ các tiêu chuẩn cao nhất về bảo mật và minh bạch. Chính sách bảo mật này được thiết kế để giải thích chi tiết cách chúng tôi thu thập, sử dụng, lưu trữ, chia sẻ và bảo vệ thông tin của bạn khi bạn truy cập hoặc sử dụng website www.dnkrealestate.com (sau đây gọi là "Website"). Chúng tôi khuyến khích bạn đọc kỹ tài liệu này để hiểu rõ hơn về cách chúng tôi xử lý dữ liệu của bạn và các quyền lợi mà bạn được hưởng.
          </p>
    
          <h3>1. Phạm vi áp dụng</h3>
          <p>
            Chính sách bảo mật này áp dụng cho tất cả người dùng truy cập Website, bao gồm nhưng không giới hạn ở khách hàng cá nhân, đối tác, nhà đầu tư, hoặc bất kỳ cá nhân/tổ chức nào tương tác với các dịch vụ của DNK Real Estate thông qua nền tảng trực tuyến. Chính sách này không áp dụng cho các website hoặc dịch vụ bên thứ ba mà bạn có thể truy cập thông qua liên kết từ Website của chúng tôi. Chúng tôi không chịu trách nhiệm về chính sách bảo mật hoặc hoạt động của các bên thứ ba này.
          </p>
    
          <h3>2. Thông tin chúng tôi thu thập</h3>
          <p>
            Để cung cấp dịch vụ tốt nhất, chúng tôi có thể thu thập các loại thông tin sau từ bạn:
          </p>
          <p>Thông tin cá nhân do bạn cung cấp: Đây là các thông tin bạn chủ động gửi đến chúng tôi thông qua các biểu mẫu đăng ký, yêu cầu tư vấn, hoặc liên hệ trên Website. Các thông tin này bao gồm:</p>
          <p>Họ và tên đầy đủ.</p>
          <p>Địa chỉ email.</p>
          <p>Số điện thoại liên lạc.</p>
          <p>Địa chỉ nơi ở hoặc thông tin liên quan đến bất động sản bạn quan tâm.</p>
          <p>Các chi tiết bổ sung như nhu cầu mua/thuê bất động sản, ngân sách dự kiến, hoặc yêu cầu cụ thể về dịch vụ.</p>
          <p>Thông tin tự động thu thập: Khi bạn truy cập Website, hệ thống của chúng tôi có thể tự động ghi nhận một số dữ liệu kỹ thuật như:</p>
          <p>Địa chỉ IP của thiết bị bạn sử dụng.</p>
          <p>Loại trình duyệt (Chrome, Firefox, Safari, v.v.) và phiên bản.</p>
          <p>Hệ điều hành của thiết bị (Windows, macOS, Android, iOS, v.v.).</p>
          <p>Thời gian truy cập, các trang bạn đã xem, và thời lượng bạn dành cho mỗi trang.</p>
          <p>Các liên kết hoặc nguồn dẫn bạn đến Website (ví dụ: công cụ tìm kiếm, mạng xã hội).</p>
          <p>Thông tin từ cookie và công nghệ tương tự: Chúng tôi sử dụng cookie, pixel, và các công cụ phân tích để thu thập dữ liệu về hành vi người dùng nhằm tối ưu hóa trải nghiệm trên Website. Bạn có thể tìm hiểu thêm về cookie trong mục riêng dưới đây.</p>
          <p>Thông tin giao dịch: Nếu bạn sử dụng các dịch vụ như yêu cầu tư vấn, đặt lịch xem bất động sản, hoặc tham gia giao dịch qua Website, chúng tôi có thể thu thập thông tin liên quan như nội dung yêu cầu, thời gian giao dịch, và các ghi chú bổ sung.</p>
    
          <h3>3. Mục đích sử dụng thông tin</h3>
          <p>
            Chúng tôi thu thập và xử lý thông tin của bạn với các mục đích rõ ràng và hợp pháp như sau:
          </p>
          <p>Cung cấp dịch vụ: Để đáp ứng yêu cầu của bạn, chẳng hạn như tư vấn về bất động sản, kết nối bạn với các chuyên viên môi giới, hoặc hỗ trợ pháp lý liên quan đến giao dịch.</p>
          <p>Cải thiện trải nghiệm người dùng: Phân tích dữ liệu để nâng cao chất lượng nội dung, giao diện Website, và cá nhân hóa các gợi ý bất động sản phù hợp với sở thích của bạn.</p>
          <p>Giao tiếp và tiếp thị: Gửi thông báo về các dự án bất động sản mới, chương trình khuyến mãi, hoặc tin tức thị trường nếu bạn đồng ý nhận thông tin qua email hoặc số điện thoại.</p>
          <p>Quản lý và vận hành: Đảm bảo Website hoạt động ổn định, phát hiện và ngăn chặn các hành vi gian lận hoặc truy cập trái phép.</p>
          <p>Tuân thủ pháp luật: Lưu trữ thông tin để đáp ứng các yêu cầu từ cơ quan chức năng hoặc bảo vệ quyền lợi hợp pháp của DNK Real Estate trong trường hợp xảy ra tranh chấp.</p>
    
          <h3>4. Cách chúng tôi chia sẻ thông tin</h3>
          <p>
            Chúng tôi cam kết không bán, cho thuê, hoặc trao đổi thông tin cá nhân của bạn với bất kỳ bên thứ ba nào vì mục đích thương mại. Tuy nhiên, trong một số trường hợp cần thiết, thông tin của bạn có thể được chia sẻ:
          </p>
          <p>Với đối tác dịch vụ: Chúng tôi hợp tác với các bên như công ty luật, ngân hàng, hoặc đơn vị thẩm định bất động sản để hoàn tất giao dịch hoặc cung cấp dịch vụ cho bạn. Các đối tác này được yêu cầu ký cam kết bảo mật và chỉ sử dụng thông tin trong phạm vi công việc được giao.</p>
          <p>Theo yêu cầu pháp lý: Nếu có yêu cầu từ cơ quan pháp luật, tòa án, hoặc cơ quan quản lý nhà nước, chúng tôi sẽ cung cấp thông tin theo đúng quy định.</p>
          <p>Bảo vệ quyền lợi: Trong trường hợp cần thiết để ngăn chặn hành vi bất hợp pháp, bảo vệ quyền sở hữu trí tuệ, hoặc giải quyết tranh chấp liên quan đến DNK Real Estate, thông tin của bạn có thể được sử dụng hoặc chia sẻ.</p>
    
          <h3>5. Bảo mật và lưu trữ thông tin</h3>
          <p>
            Chúng tôi áp dụng các biện pháp bảo mật tiên tiến để bảo vệ thông tin của bạn, bao gồm:
          </p>
          <p>Mã hóa dữ liệu trong quá trình truyền tải (SSL/TLS).</p>
          <p>Lưu trữ trên các máy chủ bảo mật với tường lửa và hệ thống phát hiện xâm nhập.</p>
          <p>Hạn chế quyền truy cập thông tin chỉ dành cho nhân viên được ủy quyền, những người buộc phải tuân thủ chính sách bảo mật nội bộ.</p>
          <p>
            Thông tin của bạn sẽ được lưu trữ trong thời gian cần thiết để thực hiện các mục đích nêu trên, trừ khi pháp luật yêu cầu thời gian lưu trữ lâu hơn. Sau khi không còn cần thiết, dữ liệu sẽ được xóa hoặc ẩn danh để không thể liên kết lại với bạn.
          </p>
    
          <h3>6. Quyền của bạn đối với thông tin cá nhân</h3>
          <p>
            Bạn có các quyền sau liên quan đến thông tin cá nhân của mình:
          </p>
          <p>Quyền truy cập: Yêu cầu xem thông tin mà chúng tôi đang lưu trữ về bạn.</p>
          <p>Quyền chỉnh sửa: Yêu cầu sửa đổi nếu thông tin không chính xác hoặc không đầy đủ.</p>
          <p>Quyền xóa: Yêu cầu xóa dữ liệu của bạn, trừ khi chúng tôi có nghĩa vụ pháp lý phải giữ lại.</p>
          <p>Quyền từ chối: Rút lại sự đồng ý nhận thông tin tiếp thị bất kỳ lúc nào.</p>
          <p>Quyền phản đối: Phản đối việc xử lý dữ liệu trong một số trường hợp cụ thể.</p>
          <p>
            Để thực hiện các quyền này, vui lòng liên hệ với chúng tôi qua thông tin được cung cấp ở mục cuối chính sách.
          </p>
    
          <h3>7. Cookie và công nghệ theo dõi</h3>
          <p>
            Website sử dụng cookie để:
          </p>
          <p>Lưu trữ tùy chọn của bạn (ví dụ: ngôn ngữ, khu vực).</p>
          <p>Theo dõi hành vi người dùng để phân tích và cải thiện dịch vụ.</p>
          <p>Hiển thị quảng cáo phù hợp (nếu có).</p>
          <p>
            Bạn có thể quản lý cookie thông qua cài đặt trình duyệt, nhưng việc tắt cookie có thể làm giảm chức năng của Website.
          </p>
    
          <h3>8. Trẻ em</h3>
          <p>
            Website của chúng tôi không hướng đến trẻ em dưới 13 tuổi. Nếu chúng tôi vô tình thu thập thông tin từ trẻ em, chúng tôi sẽ xóa ngay khi phát hiện.
          </p>
    
          <h3>9. Thay đổi chính sách</h3>
          <p>
            Chúng tôi có quyền cập nhật Chính sách bảo mật này bất kỳ lúc nào để phản ánh thay đổi trong dịch vụ hoặc quy định pháp luật. Phiên bản mới nhất sẽ được đăng trên Website và có hiệu lực ngay lập tức.
          </p>
    
          <h3>10. Liên hệ với chúng tôi</h3>
          <p>
            Nếu bạn có câu hỏi, khiếu nại, hoặc muốn thực hiện quyền của mình, vui lòng liên hệ:
          </p>
          <p>Email: dnkrealestate@gmail.com</p>
          <p>Hotline: 039 2977 999</p>
          <p>Địa chỉ: Landmark 81</p>
          <p>
            Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn.
          </p>
        </>
      ),
    },
    {
      title: "Quy chế",
      text: (
        <>
          <p>
            DNK Real Estate tự hào là cầu nối giữa người mua, người bán và các nhà đầu tư bất động sản. Để đảm bảo hoạt động của website diễn ra suôn sẻ, công bằng và tuân thủ pháp luật, chúng tôi thiết lập quy chế hoạt động sau đây. Quy chế này áp dụng cho tất cả người dùng, đối tác và nhân viên liên quan đến DNK Real Estate.
          </p>
    
          <h3>1. Mục Tiêu Hoạt Động</h3>
          <p>
            DNK Real Estate hoạt động với sứ mệnh:
          </p>
          <p>Cung cấp thông tin bất động sản chính xác, cập nhật và đa dạng.</p>
          <p>Tạo điều kiện thuận lợi cho giao dịch mua bán, cho thuê bất động sản.</p>
          <p>Xây dựng một cộng đồng bất động sản minh bạch, chuyên nghiệp và đáng tin cậy.</p>
    
          <h3>2. Nguyên Tắc Hoạt Động</h3>
          <p>Minh bạch: Mọi thông tin, chính sách và chi phí đều được công khai trên website.</p>
          <p>Công bằng: Tất cả người dùng đều được đối xử bình đẳng, không phân biệt cá nhân hay doanh nghiệp.</p>
          <p>Hợp pháp: Tuân thủ các quy định của pháp luật Việt Nam, đặc biệt là Luật Nhà ở, Luật Kinh doanh Bất động sản và các văn bản liên quan.</p>
    
          <h3>3. Quyền Và Nghĩa Vụ Của DNK Real Estate</h3>
          <p>Quyền:</p>
          <p>Từ chối cung cấp dịch vụ cho người dùng vi phạm quy định.</p>
          <p>Thu phí dịch vụ theo bảng giá công khai.</p>
          <p>Yêu cầu người dùng cung cấp thông tin xác minh khi cần thiết.</p>
          <p>Nghĩa vụ:</p>
          <p>Bảo mật thông tin cá nhân của người dùng theo chính sách bảo mật.</p>
          <p>Đảm bảo hệ thống hoạt động ổn định, cung cấp hỗ trợ kỹ thuật kịp thời.</p>
          <p>Kiểm duyệt tin đăng để đảm bảo chất lượng nội dung.</p>
    
          <h3>4. Quyền Và Nghĩa Vụ Của Người Dùng</h3>
          <p>Quyền:</p>
          <p>Sử dụng các dịch vụ miễn phí và trả phí theo quy định.</p>
          <p>Nhận hỗ trợ từ đội ngũ DNK Real Estate khi cần thiết.</p>
          <p>Đưa ra ý kiến, khiếu nại nếu không hài lòng về dịch vụ.</p>
          <p>Nghĩa vụ:</p>
          <p>Cung cấp thông tin trung thực khi đăng ký và sử dụng dịch vụ.</p>
          <p>Thanh toán đầy đủ phí dịch vụ (nếu có).</p>
          <p>Chịu trách nhiệm về nội dung đăng tải và các giao dịch phát sinh.</p>
    
          <h3>5. Chính Sách Bảo Mật</h3>
          <p>
            Thông tin cá nhân (tên, số điện thoại, email) chỉ được sử dụng để liên hệ và hỗ trợ giao dịch, không tiết lộ cho bên thứ ba mà không có sự đồng ý.
          </p>
          <p>
            Dữ liệu người dùng được lưu trữ trên hệ thống bảo mật cao, tuân thủ Nghị định 13/2018/NĐ-CP về bảo vệ thông tin cá nhân.
          </p>
          <h3>6. Giải Quyết Tranh Chấp</h3>
          <p>
            Mọi tranh chấp giữa người dùng và DNK Real Estate sẽ được giải quyết thông qua thương lượng.
          </p>
          <p>
            Nếu không đạt được thỏa thuận, tranh chấp sẽ được đưa ra cơ quan pháp luật có thẩm quyền tại Việt Nam.
          </p>
    
          <h3>7. Điều Khoản Sửa Đổi</h3>
          <p>
            DNK Real Estate có quyền cập nhật quy chế này để phù hợp với tình hình thực tế. Mọi thay đổi sẽ được thông báo qua email hoặc thông báo trên website ít nhất 7 ngày trước khi có hiệu lực.
          </p>
    
          <h3>8. Hiệu Lực Quy Chế</h3>
          <p>
            Quy chế này có hiệu lực từ ngày được đăng tải trên website DNK Real Estate và áp dụng cho tất cả người dùng truy cập nền tảng.
          </p>
          <p>
            DNK Real Estate cam kết mang đến dịch vụ chất lượng, đồng hành cùng bạn trong mọi giao dịch bất động sản. Hãy cùng chúng tôi xây dựng một thị trường bền vững và minh bạch!
          </p>
        </>
      ),
    },
    {
      title: "Giải quyết khiếu nại",
      text: (
        <>
          <h3>1. Nguyên tắc giải quyết tranh chấp, khiếu nại</h3>
          <p>
            DNK Real Estate là cổng trung gian kết nối và cung cấp thông tin bất động sản giữa bên bán và bên mua; bên cho thuê và bên thuê mà không tham gia vào bất kỳ hoạt động hay nội dung thỏa thuận nào trong giao dịch giữa hai bên.
          </p>
          <p>
            Các bên tham gia vào giao dịch mua bán, cho thuê bất động sản phải tự thẩm định và chịu trách nhiệm đối với tất cả các thông tin cá nhân, bất động sản và dịch vụ bất động sản khi tham gia giao dịch. Theo đó, Người đăng tin phải điền đầy đủ thông tin được yêu cầu cung cấp trên DNK Real Estate. Trường hợp Người đăng tin không cung cấp đầy đủ, chính xác các thông tin được yêu cầu thì DNK Real Estate được miễn trách nhiệm theo quy định tại Điều 13 Luật bảo vệ quyền lợi người tiêu dùng năm 2010.
          </p>
          <p>
            Ban quản trị DNK Real Estate sẵn sàng hỗ trợ nhanh chóng và kịp thời khi nhận được các phản hồi, khiếu nại về việc Người đăng tin đăng nội dung tin đăng, quảng cáo không chuẩn xác, sai sự thật… Trường hợp nhận được khiếu nại, Ban quản trị DNK Real Estate sẽ xác nhận lại thông tin, và tùy theo mức độ, DNK Real Estate sẽ có những biện pháp xử lý phù hợp, kịp thời.
          </p>
          <p>
            DNK Real Estate tôn trọng và nghiêm túc thực hiện các quy định của pháp luật về bảo vệ quyền lợi của người tiêu dùng. Vì vậy, đề nghị Người đăng tin cung cấp đầy đủ, chính xác, trung thực và chi tiết các thông tin liên quan đến bất động sản và dịch vụ khác liên quan (nếu có). Mọi hành vi lừa đảo, gian lận trong nội dung tin đăng, giao dịch đều bị lên án và phải chịu hoàn toàn trách nhiệm trước pháp luật.
          </p>
          <p>
            Các bên liên quan bao gồm: Người đăng tin và người mua/ bán/ cho thuê/ thuê có vai trò và trách nhiệm trong việc giải quyết các vấn đề phát sinh (nếu có).
          </p>
          <p>
            Người mua/ bán/ cho thuê/ thuê có thể gửi khiếu nại trực tiếp đến Người đăng tin hoặc thông qua ban quản trị DNK Real Estate. Sau khi tiếp nhận khiếu nại, DNK Real Estate sẽ chuyển ngay khiếu nại đó đến Người đăng tin bằng các phương thức nhanh chóng nhất.
          </p>
          <p>
            Người đăng tin phải chịu toàn bộ trách nhiệm về nội dung tin đăng trên DNK Real Estate. Trường hợp có khiếu nại phát sinh, Người đăng tin có trách nhiệm cung cấp văn bản giấy tờ chứng thực thông tin liên quan đến sự việc đang gây mâu thuẫn, khiếu nại cho DNK Real Estate và người có khiếu nại. Trong mọi trường hợp, Người đăng tin phải có trách nhiệm giải quyết mọi khiếu nại của người có khiếu nại liên quan đến bất động sản và dịch vụ bất động sản đi kèm (nếu có).
          </p>
          <p>
            Trong trường hợp phát sinh mâu thuẫn, khiếu nại, tranh chấp các bên sẽ ưu tiên giải quyết bằng biện pháp thương lượng, hòa giải. Trong trường hợp thương lượng, hòa giải không thành công thì DNK Real Estate yêu cầu các bên gửi đơn đến cơ quan nhà nước có thẩm quyền để giải quyết theo quy định của pháp luật.
          </p>
    
          <h3>2. Quy trình tiếp nhận và giải quyết khiếu nại, tranh chấp</h3>
          <p>
            Bước 1: Tất cả các yêu cầu giải quyết khiếu nại, tranh chấp sẽ được chuyển đến Bộ phận Chăm sóc khách hàng để tiếp nhận. Hotline: [Số điện thoại của bạn]; email: [hotro@dnkrealestate.com / cskh@dnkrealestate.com].
          </p>
          <p>
            Bước 2: Bộ phận Chăm sóc khách hàng sẽ tiếp nhận các khiếu nại nhanh chóng kịp thời tiến hành xác minh lại những thông tin được cung cấp (qua nhân viên có liên quan, và nội dung thông tin trên DNK Real Estate) và chuyển yêu cầu giải quyết khiếu nại tranh chấp sang Bộ phận có liên quan để đưa ra phương án giải quyết.
          </p>
          <p>
            Bước 3: Bộ phận có liên quan đề xuất phương án giải quyết khiếu nại, tranh chấp và phản hồi Bộ phận Chăm sóc khách hàng.
          </p>
          <p>
            Bước 4: Bộ phận Chăm sóc khách hàng xin ý kiến phê duyệt của Ban Giám đốc.
          </p>
          <p>
            Bước 5: Ban Giám đốc xem xét và phê duyệt phương án giải quyết khiếu nại, tranh chấp.
          </p>
          <p>
            Bước 6: Bộ phận Chăm sóc khách hàng phản hồi với người có yêu cầu giải quyết khiếu nại, tranh chấp về nội dung khiếu nại, tranh chấp và phương án giải quyết khiếu nại, tranh chấp (nếu có).
          </p>
          <p>
            Trường hợp người có yêu cầu khiếu nại, tranh chấp đồng ý với nội dung và phương án giải quyết khiếu nại, tranh chấp thì quy trình tiếp nhận giải quyết khiếu nại, tranh chấp kết thúc.
          </p>
          <p>
            Trường hợp người có yêu cầu khiếu nại, tranh chấp không đồng ý với phương án giải quyết khiếu nại, tranh chấp và yêu cầu giải quyết lại thì yêu cầu giải quyết lại khiếu nại, tranh chấp được Bộ phận Chăm sóc khách hàng tiếp nhận. Quy trình lặp lại các Bước 2, 3, 4, 5 và 6. Tại Bước 6, nếu thành viên vẫn không đồng ý với phương án giải quyết khiếu nai, tranh chấp mà Bộ phận Chăm sóc khách hàng đưa ra, người có yêu cầu khiếu nại, tranh chấp có quyền khởi kiện tại tòa án hoặc trọng tài theo các quy định của pháp luật.
          </p>
          <p>
            Quy định về Cơ chế giải quyết khiếu nại của DNK Real Estate đã được cập nhật và chính thức có hiệu lực thi hành kể từ ngày 22/03/2025.
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="flex-box">
      <header className="App-header">
        <Logo />
        <div className="header-buttons"></div>
      </header>
      <div className="dk-content">
        <div className="dk-content-box-left">
          <div className="clicking">
            {contents.map((item, index) => (
              <div
                key={index}
                className="click-indexes"
                onClick={() => setSelectedIndex(index)} // Khi nhấn, cập nhật state
                style={{
                  cursor: "pointer",
                  backgroundColor: selectedIndex === index ? "#f0f0f0" : "transparent", // Highlight mục được chọn
                }}
              >
                <p>
                  <FaAngleRight style={{ color: "grey" }} /> {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="dk-content-box-right">
          <div className="texts">
            <h1>{contents[selectedIndex].title}</h1>
          </div>
          <div className="texts">{contents[selectedIndex].text}</div>
        </div>
      </div>
    </div>
  );
}

export default Gioithieu;
