
using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;

namespace PricePublishingApp
{
   

    public class PriceGeneratorService : BackgroundService
    {
        private static readonly Random _random = new Random();
        private static readonly ConcurrentBag<WebSocket> _sockets = new ConcurrentBag<WebSocket>();

        public static void AddWebSocket(WebSocket socket)
        {
            _sockets.Add(socket);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var priceUpdate = GenerateRandomPrices();
                var delay = _random.Next(1, 101);

                await BroadcastPriceUpdate(priceUpdate);

                await Task.Delay(delay);
            }
        }

        private async Task BroadcastPriceUpdate(string message)
        {
            var buffer = Encoding.UTF8.GetBytes(message);

            foreach (var socket in _sockets)
            {
                if (socket.State == WebSocketState.Open)
                {
                    await socket.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
                }
            }
        }

        private string GenerateRandomPrices()
        {
            var eurUsd = new { IdRate = Guid.NewGuid().ToString(), Pair = "EUR/USD", Rate = (_random.NextDouble() * (1.5 - 1.0) + 1.0).ToString("F4") };
            var eurGbp = new { IdRate = Guid.NewGuid().ToString(), Pair = "EUR/GBP", Rate = (_random.NextDouble() * (0.9 - 0.7) + 0.7).ToString("F4") };
            var usdGbp = new { IdRate = Guid.NewGuid().ToString(), Pair = "USD/GBP", Rate = (_random.NextDouble() * (0.8 - 0.6) + 0.6).ToString("F4") };

            var prices = new[] { eurUsd, eurGbp, usdGbp };
            return System.Text.Json.JsonSerializer.Serialize(prices);
        }
    }

}
