var UrlApiGetAll = 'http://localhost:5009/pedido/getall';
var UrlApiInsert = 'http://localhost:5009/pedido/insertar';
var UrlApiGetOne = 'http://localhost:5009/pedido/getone/:numero_pedido';

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlApiGetAll,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MisItems = response;
            var Valores = '';

            for(i=0; i < MisItems.length; i++)
            {
                Valores += 
                    '<tr>'+
                    '<td>'+ MisItems[i].numero_pedido +'</td>'+
                    '<td>'+ MisItems[i].numero_cliente +'</td>'+
                    '<td>'+ MisItems[i].empresa +'</td>'+
                    '<td>'+ MisItems[i].fecha_pedido +'</td>'+
                    '<td>'+ MisItems[i].direccion +'</td>'+
                    '<td>'+ MisItems[i].tipo_de_pago +'</td>'+
                    '<td>'+ MisItems[i].monto_total +'</td>'+
                    '<td>'+
                    '<button id="btneditar" class="btn btn-info" onclick="CargarPedido('+ MisItems[i].numero_pedido +')">Editar</button>'+
                    '</td>'+
                    '</tr>';
                $('#DatosPedidos').html(Valores);   
            }
        }
    });
}

function AgregarPedido(){

    var datospedido={
    numero_pedido: $('#numeropedido').val(), 
    numero_cliente: $('#numerocliente').val(),
    empresa: $('#empresa').val(),
    fecha_pedido: $('#fechapedido').val(),
    direccion: $('#direccion').val(),
    tipo_de_pago: $('#tipodepago').val(),
    monto_total: $('#montototal').val()
    };

   var datospedidojson = JSON.stringify(datospedido);
   //alert (datospedidojson);

   $.ajax({
      url : UrlApiInsert,
      type : 'POST',
      data : datospedidojson,
      datatype : 'JSON',
      contentType : 'application/json',
      success: function(response){
        alert('Pedido ingresado de forma correcta');
        $('#Miformulario').submit();
      },

      error : function(textError, errorThrown){
        alert('Error: ' + textError + errorThrown);
      }
   });

}

function CargarPedido(p_numero_pedido){

    var datospedido = {
        numero_pedido : p_numero_pedido
    };

    var datospedidojson = JSON.stringify(datospedido);

    $.ajax({
      url : UrlApiGetOne,
      type : 'POST',
      data : datospedidojson,
      datatype : 'JSON',
      contentType : 'application/json',
      success : function(response){
        var MisItems = response;
        for(i=0; i < MisItems.length; i++){
            $('#numeropedido').val(MisItems[i].numero_pedido);
            $('#numerocliente').val(MisItems[i].numero_cliente);
            $('#empresa').val(MisItems[i].empresa);
            $('#fechapedido').val(MisItems[i].fecha_pedido);
            $('#direccion').val(MisItems[i].direccion);
            $('#tipodepago').val(MisItems[i].tipo_de_pago);
            $('#montototal').val(MisItems[i].monto_total);
            var btnActualizar= '<input type="button" class="btn btn-secondary" '+
            'id="btnagregar" onclick="ActualizarPedido('+ MisItems[i].numero_pedido +')" value="Actualizar Pedido" >';
            $('#btnagregarpedido').html(btnActualizar);
        } 
      }
    });
}

function ActualizarPedido(p_numero_pedido){

}


