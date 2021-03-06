$(document).ready(function(){
	var Pregunta;
	$('.Preguntar').click(function pregunta()
	{
		$('.Preguntar').attr('disabled', 'disabled');
		$(".loader-page-get").fadeIn("slow");
		id = this.id;
		tokenPost = $('meta[name="csrf-token"]').attr('content');
		axios.put('/pregunta/'+id,{
			contenido: $('#Pregunta').val(),
			_token:tokenPost,
		}).then(function (response){
			Swal.fire({
			  position: 'center',
			  icon: 'success',
			  title: 'pregunta realizada',
			  showConfirmButton: false,
			  timer: 1500
			});
			$('#Pregunta').val('');
			$('#Pregunta').attr('placeholder','Pregunta...');
			
			_tbody = $("#Preguntar > #Mipregunta");
      			item = '<div class="form-group">';
    			item += '<h6 class="" id="'+response.data.id+'">User-0'+response.data.user_id+' Pregunta:'+response.data.contenido+'</h6>';
				item += '</div>';
      		_tbody.append(item);
		}).catch(function (error){
			console.log(error);
			$('.Preguntar').removeAttr('disabled');
			$(".loader-page-get").fadeOut("slow"); 
		}).finally(function(response){
			$('.Preguntar').removeAttr('disabled');
			$(".loader-page-get").fadeOut("slow"); 
		});
	});

	$('.modalrespuesta').click(function getUser()
	{	$(".loader-page-get").fadeIn("slow");
		id = this.id;
		$('.Responder').attr('disabled', 'disabled');
		console.log(id);
		 axios.get('/pregunta/'+id).then(function(response){
		 	$('.modalrespuestaid').attr('id', response.data.id);
		 	$('#Producto-respuesta').attr('src','storage/'+response.data.producto.fotos[0].File_Name);
		 	$('#recipient-name').text(''+response.data.user.name+' '+ response.data.user.paterno);
		 	$('#contenido-pregunta').text(''+ response.data.contenido);
		 	$(".loader-page-get").fadeOut("slow");
		 	console.log(response);
		 }).catch(function(error){
		 	console.log(error);
		 }).finally(function(response){
		 	$('.Responder').removeAttr('disabled');
		 	$(".loader-page-get").fadeOut("slow");
		 }); 
	});

	$('.Responder').click(function responder()
	{
		$('.Preguntar').attr('disabled', 'disabled');
		$('.Responder').attr('disabled', 'disabled');
		$(".loader-page-get").fadeIn("slow");
		id = $('.modalrespuesta').attr('id');//De la pregunta
		tokenPost = $('meta[name="csrf-token"]').attr('content');
		axios.post('/pregunta',{
			Contenido:$('#message-text').val(),
			id:id,
			_token:tokenPost,
		}).then(function(response){
			MensajeRespuesta();
			_tr = $("#tabla_preguntas > tbody > #" + response.data.id); 
      		_tr.remove();
			console.log(response);
		}).catch(function(error){
			console.log(error);
		}).finally(function(response){
			$('.Preguntar').removeAttr('disabled');
			$('.Responder').removeAttr('disabled');
			reset();
			$('#ModalRespuesta').modal('hide');
		});
	});

	function reset()
	{
		$(".loader-page-get").fadeOut("slow");
		$('#recipient-name').text(' ');
		$('#message-text').val(' ');
	}

	function MensajeRespuesta(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Respondido'
    })
}
});