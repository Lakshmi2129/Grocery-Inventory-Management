// Show Goal

const card_trigger = () => {
	$.post('item_count', function (res) {
		$('#item_count').html(res.item_count)
		$('#quantity_count').html(res.quantity)
		$('#price_count').html(res.price)
	})
}
card_trigger()

const grocery = () => {
	$.get('add_grocery_item', function (res) {
		var ele = '';
		var resData = res
		count = 0;
		for (i = 0; i < resData.length; i++) {

			ele += `<tr><td>${resData[i].name}</td>
			<td>${(resData[i].quantity)}</td>
			<td>${(resData[i].price)}</td>

			<td><a td_pk="${(resData[i].pk)}" td_name="${(resData[i].name)}" td_qnty="${(resData[i].quantity)}" td_price="${(resData[i].price)}" type="button" id="goal_edit"${(resData[i].i)}" data-bs-toggle="modal" onclick="editgoal(this)"  href="javascript:void(0);" data-bs-target="#edit_grocery_modal" style="color:#0060fa;font-size:30px;"><i class="mdi mdi-border-color text-primary"></i></a></td>

			<td><i onclick="grocery_delete(this)" delid = "${res[i].pk}" class="mdi mdi-delete text-danger text-danger" style="cursor:pointer;font-size:20px;"></i></td></tr>`
		}
		if (!resData.length) {
			ele += `<tr>
						<td colspan="6">No data available in table</td>
					</tr>`
		}
		$('#grocery_table').html(ele);
	});
}
grocery();



// Add goal start //
$("#add_grocery_form").on('submit', function (e) {
	e.preventDefault()
	var form_data = $(this).serialize()
	$.post("add_grocery_item", form_data, function (res) {
		if (res["res"] == "success") {
			$("#add_grocery_form").trigger("reset")
			hideModal('add_grocery_modal')
			Swal.fire({
				position: "center",
				icon: "success",
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
		} else {
			Swal.fire({
				position: 'center',
				icon: 'error',
				title: res['msg'],
				showConfirmButton: false,
				timer: 1500
			})
		}
		setTimeout(() => {
			location.reload(true);
		}, "1600");
		
		grocery();
		card_trigger()
	})
	return false
})



const editgoal = (tis) => {
	$('.edit_pk').val($(tis).attr('td_pk'));
	$('.item_name').val($(tis).attr('td_name'))
	$('.item_quantity').val($(tis).attr('td_qnty'));
	$('.item_price').val($(tis).attr('td_price'));

}

// Edit Goal
$("#edit_grocery_form").on('submit', function (e) {
	e.preventDefault()
	var form_data = $(this).serialize()
	$.ajax({
		url: 'add_grocery_item',
		type: 'PUT',
		data: form_data,
		success: function (res) {
			$("#edit_grocery_form").trigger("reset")
			hideModal('edit_grocery_modal')
			if (res.res == 'success') {
				grocery();
				Swal.fire({
					position: 'center',
					icon: 'success',
					title: 'Updated Successfully',
					showConfirmButton: false,
					timer: 1500
				})
			} else {
				Swal.fire({
					position: 'center',
					icon: 'error',
					title: res['msg'],
					showConfirmButton: false,
					timer: 1500
				})
			}
			setTimeout(() => {
				location.reload(true);
			}, "1600");			card_trigger()
		},

	});

})

// Delete Goal
const grocery_delete = (camId) => {
	Swal.fire({
		title: 'Are you sure ? ',
		text: "Do you want to delete this Item",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#191C5B',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes'
	}).then((result) => {
		if (result.isConfirmed) {
			delId = {
				'pk': $(camId).attr('delId')
			}
			$.ajax({
				url: 'add_grocery_item',
				type: 'DELETE',
				data: delId,
				success: function (res) {
					if (res['res'] == "success") {
						grocery()
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: 'Deleted Successfully',
							showConfirmButton: false,
							timer: 1500
						})

					}
					card_trigger()

				},


			});
		}

	})
}


function hideModal(id) {
	$(`#${id}`).removeClass("in");
	$(".modal-backdrop").remove();
	$('body').removeClass('modal-open');
	$('body').css('padding-right', '');
	$(`#${id}`).hide();
}



$(document).ready(function () {
	$('#grocery_data_table').DataTable({
		"ordering": true,
		"bPaginate": false,
		"bLengthChange": false,
		"bFilter": false,
		"bJQueryUI": true,
		"bInfo": false,
		"bAutoWidth": false
	});
});