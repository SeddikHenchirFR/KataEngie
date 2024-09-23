    using System.Net.WebSockets;
    using System.Threading;
    using System.Threading.Tasks;
namespace PricePublishingApp
{

    public static class PriceWebSocketHandler
    {
        public static async Task HandleWebSocketAsync(WebSocket webSocket)
        {
            PriceGeneratorService.AddWebSocket(webSocket);

            var buffer = new byte[1024 * 4];
            var result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

            while (!result.CloseStatus.HasValue)
            {
                result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
        }
    }

}
