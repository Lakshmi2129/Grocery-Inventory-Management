
// Add goal start //
$("#login_form").on('submit', function (e) {
	e.preventDefault()
	var form_data = $(this).serialize()
	$.post("add_login", form_data, function (res) {
		if (res["res"] == "success") {
      location.href = '/';
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
		}
	})
	return false
})




// Add goal start //
$("#signup_form").on('submit', function (e) {
	e.preventDefault()
	var form_data = $(this).serialize()
	$.post("add_signup", form_data, function (res) {
		if (res["res"] == "success") {
			$("#signup_form").trigger("reset")
			Swal.fire({
				position: "center",
				icon: "success",
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
      location.href = 'login';

		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
		}
	})
	return false
})


var logout_val = true
const logout = () => {
  if (logout_val == true){
    $('.login').css('display','block')
    logout_val = false
  }
  else{
    $('.login').css('display','none')
    logout_val = true

  }
}
