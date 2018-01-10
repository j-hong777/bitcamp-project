package bigdata3.awsiot;

import java.util.Map;

import org.springframework.stereotype.Component;

import com.amazonaws.services.iot.client.AWSIotException;
import com.amazonaws.services.iot.client.AWSIotMessage;
import com.amazonaws.services.iot.client.AWSIotMqttClient;
import com.amazonaws.services.iot.client.AWSIotQos;
import com.amazonaws.services.iot.client.AWSIotTopic;
import com.amazonaws.services.iot.client.sample.sampleUtil.SampleUtil;
import com.amazonaws.services.iot.client.sample.sampleUtil.SampleUtil.KeyStorePasswordPair;
import com.google.gson.Gson;

@Component
public class TopicPubSub {

  private final String Topic1 = "topic_1";
  private final AWSIotQos Topic1Qos = AWSIotQos.QOS0;
  private AWSIotMqttClient awsIotClient;

  private String clientEndpoint = "a3ag6xqca3ze3x.iot.ap-northeast-2.amazonaws.com";
  private String clientId = "client3";

  private String certificateFile = "/home/ec2-user/vars/aws-iot/dev01/dev01.cert.pem";
  private String privateKeyFile = "/home/ec2-user/vars/aws-iot/dev01/dev01.private.key";

  // private String result;
  private String humidity;
  private String temperature;
  private String dustDensityug;
  /*
  public String getResult() {
    return result;
  }
  */
  public String getHumidity() {
    return humidity;
  }
  public String getTemperature() {
    return temperature;
  }
  public String getdustDensityug() {
    return dustDensityug;
  }

  public TopicPubSub() {
    if (awsIotClient == null && certificateFile != null && privateKeyFile != null) {
      KeyStorePasswordPair pair = SampleUtil.getKeyStorePasswordPair(
          certificateFile,
          privateKeyFile);

      awsIotClient = new AWSIotMqttClient(
          clientEndpoint,
          clientId,
          pair.keyStore,
          pair.keyPassword);
    }

    if (awsIotClient == null) {
        throw new IllegalArgumentException("?ù∏Ï¶ùÏÑú?? ?ã†?ö©?û•?ù¥ ?ú†?ö®?ïòÏß? ?ïä?ïÑ AWSIotMqttClient ?Éù?Ñ± ?ã§?å®!");
    }

    try {
      awsIotClient.connect();
      System.out.println("AWS IoT ?ÑúÎ≤ÑÏóê ?ó∞Í≤∞Îê®!");

      awsIotClient.subscribe(new AWSIotTopic(Topic1, Topic1Qos) {
        @Override
        public void onMessage(AWSIotMessage message) {
          // ?ù¥ Î©îÏÑú?ìú?äî ?ÑúÎ≤ÑÏóê?Ñú Î©îÏãúÏß?Î•? ?àò?ã† ?ï† ?ïå ÎßàÎã§ ?ò∏Ï∂úÎêú?ã§.
          //System.out.println(System.currentTimeMillis() + ": <<< " + message.getStringPayload());


            @SuppressWarnings("unchecked")
            Map<String,Object> data = new Gson().fromJson(message.getStringPayload(), Map.class);

            if (data.get("sensor").equals("dht")) {
                humidity = (String)data.get("humi");
                temperature = (String)data.get("temp");
            } else if (data.get("sensor").equals("dust")) {
                dustDensityug = (String)data.get("dust");
            }

        }
      }, true);

      System.out.printf("'%s' Íµ¨ÎèÖÏ§?...", Topic1);

    } catch (Exception e) {
      throw new RuntimeException("AWS IoT ?ÑúÎ≤ÑÏóê ?ó∞Í≤? ?ã§?å®!");
    }
  }
  /*
  public void publish(String payload) throws AWSIotException {
    awsIotClient.publish(Topic1, payload);
  }
  */
  public void publish(String topic, String payload) throws AWSIotException {
    awsIotClient.publish(topic, payload);
  }

  /*
  public static void main(String[] args) throws Exception {
    TopicSubscriber subscriber = new TopicSubscriber();
  }
  */
}
