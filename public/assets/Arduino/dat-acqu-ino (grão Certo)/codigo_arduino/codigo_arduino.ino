#include "Ultrasonic.h" // Contem comandos inseridos previamente.

const int PINO_TRIGGER = 12;
const int PINO_ECHO = 13; // São as conexões dos pinos do sensor

HC_SR04 sensor(PINO_TRIGGER, PINO_ECHO); // Cria o objeto sensor da classe HC_SR04

float alturaTotal = 20; // variável que define a altura total do silo em CM
                      
void setup() {
  Serial.begin(9600); // Inicia a comunicação pra captação de dados

}

void loop() { // Onde o fluxo acontece

  float distancia = sensor.distance(); // Variável que mede a distância do sensor até o topo do grão


  // Comandos para aparecer no gráfico ou de maneira escrita
  //Serial.print("Distancia(cm):");
  Serial.println(distancia);

  delay(1500);
}