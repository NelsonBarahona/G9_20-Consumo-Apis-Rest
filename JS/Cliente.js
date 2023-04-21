var UrlApiGetAll = 'http://localhost:5009/cliente/getall';
var UrlApiInsert= 'http://localhost:5009/cliente/insertar';
var UrlApiGetOne = 'http://localhost:5009/cliente/getone/:numero_cliente';
var UrlApiUpdate = 'http://localhost:5009/cliente/actualizar';
var UrlApiDelete = 'http://localhost:5009/cliente/eliminar/:numero_cliente';

$(document).ready(function(){
    CargarCliente();
})

function CargarCliente(){
    $.ajax({
        UrlApiGetAll,
        type: 'GET',
        datatype:'JSON',
        success: function(response){
            var MisItems=response;
            var Valores = '';

            for(i=0; i< MisItems.length; i++)
            {
                valores +=
                '<tr>'+
                   '<td>'+ MisItems[i].numero_cliente +'</td>'+
                   '<td>'+ MisItems[i].nombre +'</td>'+
                   '<td>'+ MisItems[i].apellido +'</td>'+
                   '<td>'+ MisItems[i].fecha_registro +'</td>'+
                   '<td>'+ MisItems[i].direccion_cliente +'</td>'+
                   '<td>'+ MisItems[i].rtn +'</td>'+
                   '<td>'+ MisItems[i].email +'</td>'+
                '</tr>';
                $('#DatosCliente').html(valores);
            }
        }
    });
}

function AgregarCliente(){

    var datoscliente={
        numero_cliente: $('#numerocliente').val(), 
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        fecha_registro: $('#fecharegistro').val(),
        direccion_cliente : $('#direccioncliente').val(),
        rtn: $('#rtn').val(),
        email: $('#email').val()
        };
     //Convertir objeto de datos a formato JSON
       var datosclientejson = JSON.stringify(datoscliente);
   
    //alert(datosclientejson);
       $.ajax({
          url : UrlApiInsert,
          type : 'POST',
          data : datosclientejson,
          datatype : 'JSON',
          contentType : 'application/json',
          success: function(response){
            alert('cliente ingresado de forma correcta');
            $('#Miformulario').submit();
          },
    
          error : function(textError, errorThrown){
            alert('Error: ' + textError + errorThrown);
          }
       });
    
}
    

function CargarCliente(numero_cliente){

    var datoscliente = {
        numero_cliente : numero_cliente
    };

    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
      url : UrlApiGetOne,
      type : 'POST',
      data : datosclientejson,
      datatype : 'JSON',
      contentType : 'application/json',
      success : function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){
            $('#numerocliente').val(MisItems[i].numero_cliente);
            $('#nombre').val(MisItems[i].nombre);
            $('#apellido').val(MisItems[i].apellido);
            $('#fecha_registro').val(MisItems[i].fecha_registro);
            $('#direccion_cliente').val(MisItems[i].direccion_cliente);
            $('#rtn').val(MisItems[i].rtn);
            $('#email').val(MisItems[i].email);
            var btnactualizar= '<input type="button" class="btn btn-warning" '+
            'id="btnactualizar" onclick="ActualizarCliente('+ MisItems[i].numero_cliente +')" value="Actualizar Clente" >';
            $('#btnagregarpedido').html(btnactualizar);
        } 
      }
    });
}

function ActualizarCliente(numero_cliente){
    var datoscliente={
        numero_cliente : numero_cliente,
        numero_cliente: $('#numero_cliente').val(), 
        nombre: $('#nombre').val(),
        apellido: $('#apellido').val(),
        fecha_registro: $('#fecharegistro').val(),
        direccion_cliente : $('#direccioncliente').val(),
        rtn: $('#rtn').val(),
        email: $('#email').val()
        };
        var datosclientejson = JSON.stringify(datoscliente);
        //alert (datosclientejson);
       

        $.ajax({
            url: UrlApiUpdate,
            type: 'PUT',
            data: datosclientejson,
            datatype: 'JSON',
            contentType: 'application/json',
            success: function(response){
                console.log(response);
            }
        });
        alert("Cliente Actualizado de Forma Correcta")
}

function Eliminarcliente(numero_cliente){
    var datoscliente = {
        numero_cliente : numero_cliente
    };
    var datosclientejson = JSON.stringify(datoscliente);

    $.ajax({
        url: UrlApiDelete,
        type: 'DELETE',
        data: datosclientejson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Cliente Eliminado de Forma Correcta")
}


