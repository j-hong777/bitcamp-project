// ESP8266WiFi 라이브러리 사용
#include <ESP8266WiFi.h>
// DHT11 센서(온습도) 라이브러리 사용
#include <DHT11.h>
// aREST API 사용 - 라즈페리파이 연동
#include <aREST.h>

int pin = D1;  // 핀설정
DHT11 dht11(pin);

// Create aREST instance
aREST rest = aREST();

// WiFi parameters
const char* ssid = "anygate";
const char* password = "bitcamp3cmd";

// The port to listen for incoming TCP connections 
#define LISTEN_PORT           80

// Create an instance of the server
WiFiServer server(LISTEN_PORT);

// Variables to be exposed to the API
float temperature;
float humidity;

void setup() {
  // Start Serial
  Serial.begin(9600); // 9600 보드레이트 사용

  // Init variables and expose them to REST API
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);
    
  // Give name and ID to device
  rest.set_id("1");
  rest.set_name("sensor_module");
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
 
  // Start the server
  server.begin();
  Serial.println("Server started");
  
  // Print the IP address
  Serial.println(WiFi.localIP());
  
}


 
void loop() {
  int i;
  if((i = dht11.read(humidity, temperature)) == 0) {  // 온도, 습도 값을 읽어오면
    Serial.println("Humidity:"+(String)humidity);          // ‘시리얼 플로터’ 사용위해 이부분 주석 필요 + 습도값 출력                 
    Serial.println("Temperature:"+(String)temperature);       // ‘시리얼 플로터’ 사용위해 이부분 주석 필요 + 온도값 출력
    
    Serial.println(WiFi.localIP()); 
  } 
  else{ 
    Serial.print("Error:");                    
    Serial.print(i);                          
  }  
  delay(1000);

  // Handle REST calls
  WiFiClient client = server.available();
  if (!client) {
    return;
  }
  while(!client.available()){
    delay(1);
  }
  rest.handle(client);

  
} 
