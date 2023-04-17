var UrlApiGetAll = 'http://localhost:5009/pedido/getall';

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