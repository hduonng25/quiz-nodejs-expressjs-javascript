export function senMailNumberRanDom(data) {
    const mail = {
        from: "honngduong25@gmail.com",
        to: data.email,
        subject: 'Đổi mật khẩu',
        text: 'Nhập mã sau để đổi mật khẩu!',
        html: `<b>Xin chào ${data.user.name}</b><br> 
               <b>Nhập mã sau để đổi mật khẩu</b><br>
               <b>Mã: ${data.numberRanDom}</b><br>`
    }

    return mail;
}