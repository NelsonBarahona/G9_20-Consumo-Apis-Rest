var UrlApiGetAll = 'http://localhost:5009/pedido/getall';
var UrlApiInsert = 'http://localhost:5009/pedido/insertar';

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
