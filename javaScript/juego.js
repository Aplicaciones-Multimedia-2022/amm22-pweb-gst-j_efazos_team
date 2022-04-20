window.onload = function () {
   jugar();
}

//Obtenemos las propiedades del canvas
var canvas = document.getElementById('micanvas');
var ctx = canvas.getContext('2d');
if (canvas && canvas.getContext) {  //Comprobamos que el navegador es compatible.

   var contexto = canvas.getContext('2d'); //Recuperamos el contexto 2D de este canvas, necesario para poder pintar.
}
else {
   alert("No se ha inicializado correctamente");
}

var nivel = 1; //Esta variable servirá para controlar qué nivel es el que se está jugando y las teclas que se usarán en cada uno.
var a;
var b;
var c;
var pause;

var boton = document.getElementById('miboton')
boton.addEventListener('click', activar_musica_de_fondo)

let musica_fondo = document.getElementById('musica')
function activar_musica_de_fondo() {
   musica_fondo.play();

}

var boton2 = document.getElementById('miboton2')
boton2.addEventListener('click', parar_musica_de_fondo)


function parar_musica_de_fondo() {
   musica_fondo.pause();

}
//Creo una imagen con un objeto Imagen de Javascript
var img = new Image();
img.src = 'Fondos/canvas1.jpg'; //Esta imagen será el fondo del nivel 1

var img2 = new Image();
img2.src = "Fondos/canvas2.jpg" //Esta imagen será el fondo del nivel 2

var img3 = new Image();
img3.src = "Fondos/canvas3.jpg" //Esta imagen será el fondo del nivel 3

var img4 = new Image();
img4.src = "Fondos/canvas4.jpg" //Esta imagen será el fondo cuando se haya completado el juego

var Personaje = function (x, y, h, w, direccionx, score) {

   // Coordenadas del personaje
   this.x = x;
   this.y = y;
   // Dimensiones del personaje
   this.w = w;
   this.h = h;

   this.direccionx = direccionx;

   this.score = 0; //Variable que solo va a modificar el objeto del superhéroe. Será el número de personas que se han salvado.

   this.vidas = 3; //Variable que solo va a modificar el objeto del superhéroe. Perderá 1 vida cuando haya contacto con algún enemigo.
}

//Aquí declaramos todos los efectos de sonido que vamos a emplear.

let grito = new Audio();
grito.src = "Sonidos/grito.mp3"

let disparo = new Audio();
disparo.src = "Sonidos/disparo.mp3"

let musicadefondo = new Audio();
musicadefondo.src = "Sonidos/musica_fondo.mp3"

let sonido_salvar = new Audio();
sonido_salvar.src = "Sonidos/personasalvada.mp3"

let grito_enemigo = new Audio();
grito_enemigo.src = "Sonidos/grito_enemigo.mp3"

let alien_abatido = new Audio();
alien_abatido.src = "Sonidos/alien_abatido.mp3"

//Aquí declaramos los objetos que representan a los personajes distribuidos por el mapa.

//PERSONAJES NIVEL 1

var superheroe1 = new Personaje(20, 520, 100, 100, 0) //Thor comienza la partida en la plataforma de abajo a la izquierda

var enemigo1 = new Personaje(1100, 120, 150, 100, 0) //Hela villana
var enemigo_golpeado = 0; //Esta variable comprobará si ha disparado al enemigo.

var persona1 = new Personaje(610, 550, 110, 120, 0) //Odín
var persona1_salvada = 0; //Esta variable comprobará si una persona ha sido salvada

var persona2 = new Personaje(50, 250, 110, 110, 0) //Jane
var persona2_salvada = 0; //Esta variable comprobará si una persona ha sido salvada

var persona3 = new Personaje(1230, 410, 110, 100, 0) //loki
var persona3_salvada = 0; //Esta variable comprobará si una persona ha sido salvada

var alienigena_1 = new Personaje(1000, 400, 105, 105, 0)
var alien1_golpeado = 0; //Varibale para controlar si han disparado al enemigo

var alienigena_2 = new Personaje(680, 255, 105, 105, 0)
var alien2_golpeado = 0; //Varibale para controlar si han disparado al enemigo

//Aquí abrimos las imágenes correspondientes a cada personaje

var thor = new Image(); //Abrimos la imagen
thor.src = "Personajes/thor.png"

var thanos = new Image(); //Abrimos la imagen
thanos.src = "Personajes/hela.png"

var hombre = new Image(); //Abrimos la imagen
hombre.src = "Personajes/odin.png"

var mujer = new Image(); //Abrimos la imagen
mujer.src = "Personajes/jane.png"

var nino = new Image(); //Abrimos la imagen
nino.src = "Personajes/loki.png"

var alien_1 = new Image();
alien_1.src = "Personajes/alien.png"

var alien_2 = new Image();
alien_2.src = "Personajes/alien.png"

var imagen_suelo1 = new Image();
imagen_suelo1.src = "Fondos/plataforma1.png"

var misil1 = new Image(); //El superhéroe disparará hacia la derecha
misil1.src = "Personajes/bala_derecha.png"

var misil2 = new Image(); //El superhéroe disparará hacia la izquierda
misil2.src = "Personajes/bala_izquierda.png"

var fuego = new Image();
fuego.src = "Personajes/fuego.png"

//Las variables de tipo rectángulo se utilizan para representar las plataformas y los proyectiles.
var rectangulo = function (x, y, w, h,) {

   // Coordenadas de la plataforma/bala
   this.x = x;
   this.y = y;
   // Dimensiones de la plataforma/bala
   this.w = w;
   this.h = h;

}

//Declaramos dónde se va a situar cada plataforma y cada proyectil en el momento inicial.
var suelo = new rectangulo(0, 750, 10, 1500)
var plataforma1 = new rectangulo(0, 650, 50, 700)
var plataforma2 = new rectangulo(500, 485, 40, 900)
var plataforma3 = new rectangulo(0, 340, 40, 300)
var plataforma4 = new rectangulo(475, 340, 40, 300)
var plataforma5 = new rectangulo(950, 340, 40, 200)
var plataforma6 = new rectangulo(1100, 200, 40, 300)
var bala1 = new rectangulo(superheroe1.x - 40, superheroe1.y + 40, 40, 80)
var bala2 = new rectangulo(superheroe1.x - 40, superheroe1.y + 40, 40, 80)

var disparar_bala = 0; //Variable que controla la bala hacia la derecha
var disparar_bala2 = 0; //Variable que controla la bala hacia la izquierda

var disparo_alien1 = new rectangulo(alienigena_1.x, alienigena_1.y + 10, 40, 80) //Proyectil proveniente del primer alienígena
var disparo_alien2 = new rectangulo(alienigena_2.x, alienigena_2.y + 10, 40, 80) //Proyectil proveniente del segundo alienígena

//En la siguiente función se representa en el canvas los elementos que conforman el PRIMER NIVEL

function dibujarFondo() {

   ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //Imagen de fondo

   //Plataformas
   ctx.drawImage(imagen_suelo1, plataforma1.x, plataforma1.y, plataforma1.h, plataforma1.w);
   ctx.drawImage(imagen_suelo1, plataforma2.x, plataforma2.y, plataforma2.h, plataforma2.w);
   ctx.drawImage(imagen_suelo1, plataforma3.x, plataforma3.y, plataforma3.h, plataforma3.w);
   ctx.drawImage(imagen_suelo1, plataforma4.x, plataforma4.y, plataforma4.h, plataforma4.w);
   ctx.drawImage(imagen_suelo1, plataforma5.x, plataforma5.y, plataforma5.h, plataforma5.w);
   ctx.drawImage(imagen_suelo1, plataforma6.x, plataforma6.y, plataforma6.h, plataforma6.w);

   //Línea que representa la parte inferior del canvas.
   ctx.beginPath();
   ctx.moveTo(1100, 200);
   ctx.lineWidth = 12;

   ctx.rect(suelo.x, suelo.y, suelo.h, suelo.w)
   ctx.stroke();



}

//Esta función controla todo lo relacionado con el NIVEL 1

function jugar_nivel1() { //Función para dibujar a nuestro queridísimo Thor

   clearRect();
   dibujarFondo();
   mover_enemigo();

   //Dibujamos al superhéroe.
   ctx.drawImage(thor, superheroe1.x, superheroe1.y, superheroe1.h, superheroe1.w);

   //Controlamos que cuando las personas sigan en el mapa mientras NO se hayan salvado.
   if (persona1_salvada != 1) {
      ctx.drawImage(hombre, persona1.x, persona1.y, persona1.h, persona1.w);
   }
   if (persona2_salvada != 1) {
      ctx.drawImage(mujer, persona2.x, persona2.y, persona2.h, persona2.w);
   }
   if (persona3_salvada != 1) {
      ctx.drawImage(nino, persona3.x, persona3.y, persona3.h, persona3.w);
   }

   //Controlamos que mientras no hayamos eliminado a los enemigos estos sigan en el mapa.
   if (enemigo_golpeado != 1) {
      ctx.drawImage(thanos, enemigo1.x, enemigo1.y, enemigo1.h, enemigo1.w);

   }

   if (alien1_golpeado != 1) {
      ctx.drawImage(alien_1, alienigena_1.x, alienigena_1.y, alienigena_1.h, alienigena_1.w);
      ctx.drawImage(fuego, disparo_alien1.x, disparo_alien1.y, disparo_alien1.h, disparo_alien1.w)
      ctx.stroke();
      disparo_alien1_movimiento();

   }

   if (alien2_golpeado != 1) {
      ctx.drawImage(alien_2, alienigena_2.x, alienigena_2.y, alienigena_2.h, alienigena_1.w);
      ctx.drawImage(fuego, disparo_alien2.x, disparo_alien2.y, disparo_alien2.h, disparo_alien2.w)
      ctx.stroke();
      disparo_alien2_movimiento();

   }

   //Comprobamos el correcto funcionamiento de las balas.
   if (disparar_bala == 1) {

      ctx.drawImage(misil1, bala1.x, bala1.y, bala1.h, bala1.w)
      ctx.stroke();
      bala_movimiento();
   }

   if (disparar_bala2 == 1) {

      ctx.drawImage(misil2, bala2.x, bala2.y, bala2.h, bala2.w)
      ctx.stroke();
      bala_movimiento2()

   }

   //Llamamos a la función que comprueba si se ha salvado a una persona
   comprobar_salvados();
   //Llamamos a la función que controla el salto del superhéroe y si este cae sobre una plataforma
   gravedad();
   //En caso de que se haya salvado a una persona se modifica el contador
   ContadorDeSalvados(superheroe1.score, 830, 90);
   //En caso de que se pierda una vida se modifica el contador
   ContadorDeVidas(superheroe1.vidas, 590, 90)
   //Comprueba si ha habido alguna colisión con algún enemigo
   comprobar_choque_enemigo();

   //Cuando se hayan salvado a todas las personas y se hayan eliminado todos los enemigos, pasamos al siguiente nivel.
   if (enemigo_golpeado == 1 && alien1_golpeado == 1 && alien2_golpeado == 1 && persona1_salvada == 1 && persona2_salvada == 1 && persona3_salvada == 1) {

      nivel = 2;

      //IMPORTANTE: Hay salir del "setInterval" para no quedarnos en un bucle.
      clearInterval(a);

      //Limpiamos el canvas antes de dibujar el nuevo mapa con sus nuevos elementos.
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      b = setInterval(jugar_nivel2, 1);

   }
}

//Esta función sirve para que el enemigo final de cada nivel se mueva en su respectiva plataforma.
function mover_enemigo() {
   if (enemigo1.direccionx == 0)
      enemigo1.x = enemigo1.x + 0.6;
   else
      enemigo1.x = enemigo1.x - 0.6;
   if (enemigo1.x > 1300)
      enemigo1.direccionx = 1;
   if (enemigo1.x == 1100)
      enemigo1.direccionx = 0;
}

//Esta función borrará toda el área del canvas, haciéndola transparente, antes de pintar sobre él.

function clearRect() {
   contexto.restore();   // Restaura el contexto sin efectos
   contexto.clearRect(0, 0, 1500, 700); // Borra las figuras del tamaño y posición especificadas.
   contexto.save(); //Guarda el estado de estilos de dibujo actual en una pila.
}

//Controlamos qué tecla se está tocando en cada momento.
window.addEventListener('keydown', listenerPulsaTecla, true); //Detección de la tecla pulsada.



//Función que controla el salto del superhéroe y si este cae sobre una plataforma

function gravedad() {
   //Comrueba suelo                                   //Comprueba plataforma 1                                                               //Comprueba plataforma 2                                                                                                                            //Comprueba plataforma 3                                                                                                      //Comprueba plataforma4
   if ((superheroe1.y != (suelo.y - superheroe1.w)) && ((superheroe1.y != (plataforma1.y - superheroe1.w)) || (superheroe1.x > plataforma1.h)) && ((superheroe1.y != (plataforma2.y - superheroe1.w)) || (superheroe1.x < plataforma2.x - 85 || superheroe1.x > plataforma2.x + plataforma2.h - 10)) && ((superheroe1.y != (plataforma3.y - superheroe1.w)) || (superheroe1.x < plataforma3.x - 85 || superheroe1.x > plataforma3.x + plataforma3.h)) && ((superheroe1.y != (plataforma4.y - superheroe1.w)) || (superheroe1.x < plataforma4.x - 85 || superheroe1.x > plataforma4.x + plataforma4.h)) && ((superheroe1.y != (plataforma5.y - superheroe1.w)) || (superheroe1.x < plataforma5.x - 85 || superheroe1.x > plataforma5.x + plataforma5.h)) && ((superheroe1.y != (plataforma6.y - superheroe1.w)) || (superheroe1.x < plataforma6.x - 85 || superheroe1.x > plataforma6.x + plataforma6.h - 10))) {//635
      superheroe1.y++;
   }
   else if (superheroe1.y == (suelo.y - superheroe1.w)) { //Si el superhéroe cae en la parte inferior del canvas, perderá una vida.
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      grito.play();
   }
   else if (superheroe1.vidas == 0) { //Si se acaban las vidas salta la alerta y se reinician todas las variable para volver a comenzar el juego.
      alert("Se han acabado las vidas")
      reiniciar_nivel1();

   }
}

//Esta función comprueba si el superhéroe está en contacto con alguna persona para que en ese caso aumente el contador de personas salvadas y la respectiva persona desaparezca del mapa.
function comprobar_salvados() {
   if (superheroe1.x <= persona1.x + 10 && superheroe1.x >= persona1.x - 10 && superheroe1.y >= persona1.y - 10 && superheroe1.y <= persona1.y + 10 && persona1_salvada != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.score++;
      persona1_salvada = 1;
      sonido_salvar.play(); //Se activa el sonido que indica que se ha salvada a la persona
   }

   if (superheroe1.x <= persona2.x + 10 && superheroe1.x >= persona2.x - 10 && superheroe1.y >= persona2.y - 10 && superheroe1.y <= persona2.y + 10 && persona2_salvada != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.score++;
      persona2_salvada = 1;
      sonido_salvar.play();

   }

   if (superheroe1.x <= persona3.x + 40 && superheroe1.x >= persona3.x - 40 && superheroe1.y >= persona3.y - 40 && superheroe1.y <= persona3.y + 40 && persona3_salvada != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.score++;
      persona3_salvada = 1;
      sonido_salvar.play();

   }

}

//Comprueba si ha habido alguna colisión con algún enemigo

function comprobar_choque_enemigo() {
   if (superheroe1.x <= enemigo1.x + 40 && superheroe1.x >= enemigo1.x - 40 && superheroe1.y >= enemigo1.y - 40 && superheroe1.y <= enemigo1.y + 40 && enemigo_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      grito.play();

      if (superheroe1.vidas == 0) {
         alert("Se han acabado las vidas")
         reiniciar_nivel1();


      }
   }

   if (superheroe1.x <= alienigena_1.x + 40 && superheroe1.x >= alienigena_1.x - 40 && superheroe1.y >= alienigena_1.y - 40 && superheroe1.y <= alienigena_1.y + 40 && alien1_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      grito.play();

      if (superheroe1.vidas == 0) {
         alert("Se han acabado las vidas")
         reiniciar_nivel1();

      }
   }

   if (superheroe1.x <= alienigena_2.x + 40 && superheroe1.x >= alienigena_2.x - 40 && superheroe1.y >= alienigena_2.y - 40 && superheroe1.y <= alienigena_2.y + 40 && alien2_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      grito.play();

      if (superheroe1.vidas == 0) {
         alert("Se han acabado las vidas")
         reiniciar_nivel1();

      }
   }
}

//Función que controla si la bala DERECHA (TECLA D) ha golpeado al enemigo.

function bala_movimiento() {

   //Comprobamos si la bala toca a Thanos
   if (!(bala1.x <= enemigo1.x + 40 && bala1.x >= enemigo1.x - 40 && bala1.y >= enemigo1.y - 40 && bala1.y <= enemigo1.y + 40 && enemigo_golpeado == 0)) {
      bala1.x++;
   }
   else {
      enemigo_golpeado = 1;
      bala1.x = 1500;
      grito_enemigo.play();
   }

   //Comprobamos si la bala toca al primer alienígena
   if (!(bala1.x <= alienigena_1.x + 40 && bala1.x >= alienigena_1.x - 40 && bala1.y >= alienigena_1.y - 40 && bala1.y <= alienigena_1.y + 40 && alien1_golpeado == 0)) {
      bala1.x++;
   }

   else {

      alien1_golpeado = 1;
      bala1.x = 1500;
      alien_abatido.play();
   }

   //Comprobamos si la bala1 toca al segundo alienígena
   if (!(bala1.x <= alienigena_2.x + 40 && bala1.x >= alienigena_2.x - 40 && bala1.y >= alienigena_2.y - 40 && bala1.y <= alienigena_2.y + 40 && alien2_golpeado == 0)) {
      bala1.x++;
   }

   else {

      alien2_golpeado = 1;
      bala1.x = 1500;
      alien_abatido.play();

   }
}

//Función que controla si la bala IZQUIERDA (TECLA S) ha golpeado al enemigo.

function bala_movimiento2() {

   //Comprobamos si la bala2 toca a Thanos
   if (!(bala2.x <= enemigo1.x + 40 && bala2.x >= enemigo1.x - 40 && bala2.y >= enemigo1.y - 40 && bala2.y <= enemigo1.y + 40 && enemigo_golpeado == 0)) {
      bala2.x--;
   }

   else {
      enemigo_golpeado = 1;
      bala2.x = -20;
   }

   //Comprobamos si la bala2 toca al primer alienígena
   if (!(bala2.x <= alienigena_1.x + 40 && bala2.x >= alienigena_1.x - 40 && bala2.y >= alienigena_1.y - 40 && bala2.y <= alienigena_1.y + 40 && alien1_golpeado == 0)) {
      bala2.x--;
   }

   else {

      alien1_golpeado = 1;
      bala2.x = -20;
   }
   //Comprobamos si la bala2 toca al segundo alienígena
   if (!(bala2.x <= alienigena_2.x + 40 && bala2.x >= alienigena_2.x - 40 && bala2.y >= alienigena_2.y - 40 && bala2.y <= alienigena_2.y + 40 && alien2_golpeado == 0)) {
      bala2.x--;
   }

   else {

      alien2_golpeado = 1;
      bala2.x = -20;
   }

}

//Esta función comprueba los proyectiles que lanza el primer alienígena.

function disparo_alien1_movimiento() { //Disparo que sale del alienígena 1
   disparo_alien1.x--;
   if (disparo_alien1.x == 0) {
      disparo_alien1.x = alienigena_1.x;
   }
   if (superheroe1.x <= disparo_alien1.x + 40 && superheroe1.x >= disparo_alien1.x - 40 && superheroe1.y >= disparo_alien1.y - 40 && superheroe1.y <= disparo_alien1.y + 40 && enemigo_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      disparo_alien1.x = alienigena_1.x;
   }


   if (superheroe1.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel1();

   }

}

//Esta función comprueba los proyectiles que lanza el primer alienígena.

function disparo_alien2_movimiento() { //Disparo que sale del alienígena 2
   disparo_alien2.x++;
   if (disparo_alien2.x == 1500) {
      disparo_alien2.x = alienigena_2.x;

   }
   if (superheroe1.x <= disparo_alien2.x + 40 && superheroe1.x >= disparo_alien2.x - 40 && superheroe1.y >= disparo_alien2.y - 40 && superheroe1.y <= disparo_alien2.y + 40 && enemigo_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe1.vidas--;
      superheroe1.x = 20;
      superheroe1.y = 520;
      disparo_alien2.x = alienigena_2.x;
   }


   if (superheroe1.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel1();
   }

}

function reiniciar_nivel1() {
   superheroe1.vidas = 3;
   enemigo_golpeado = 0
   persona1_salvada = 0;
   persona2_salvada = 0;
   persona3_salvada = 0;
   alien1_golpeado = 0;
   alien2_golpeado = 0;
   superheroe1.score = 0;
   disparo_alien1.x = alienigena_1.x;
   disparo_alien2.x = alienigena_2.x;
   disparo_alien1.y = alienigena_1.y;
   disparo_alien2.y = alienigena_2.y;
}

//Esta función muestra por pantalla el número de personas salvadas

function ContadorDeSalvados(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText("Salvados", 750, 50);
}

//Esta función muestra por pantalla el número de vidas restantes

function ContadorDeVidas(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText("Vidas", 550, 50);
}

function listenerPulsaTecla() {
   keyCode = window.event.keyCode;
   if (nivel == 1) { //Teclas correspondientes al nivel 1.

      switch (keyCode) {
         case 68: //El superhéroe dispara hacia la DERECHA (TECLA D)
            disparar_bala = 1;
            bala1.x = superheroe1.x;
            bala1.y = superheroe1.y;
            disparo.play();

            break;

         case 83: //El superhéroe dispara hacia la IZQUIERDA (TECLA S)
            disparar_bala2 = 1;
            bala2.x = superheroe1.x;
            bala2.y = superheroe1.y;
            disparo.play();

            break;

         case 32: //El superhéroe salta hacia arriba (BARRA ESPACIADORA)
            if (superheroe1.y > 85)
               superheroe1.y -= 170;

            break;
         case 37: //El superhéroe se mueve hacia la IZQUIERDA
            if (superheroe1.x > 0)
               superheroe1.x -= 15;
               thor.src = "Personajes/thor2.png"

            break;
         case 39: //El superhéroe se mueve hacia la DERECHA
            if (superheroe1.x < 1400) {
               superheroe1.x += 15;
               thor.src = "Personajes/thor.png"
            }

            break;
         default:

            break;
      }

   }

   if (nivel == 3) { //Teclas correspondientes al nivel 3.
      switch (keyCode) {

         case 68: //El superhéroe dispara hacia la DERECHA (TECLA D)
            if (gemas_recogidas == 3) {
               disparar_bala_nivel3 = 1;
               bala1_nivel3.x = superheroe3.x;
               bala1_nivel3.y = superheroe3.y;
               disparo.play();
            }

            break;

         case 83: //El superhéroe dispara hacia la IZQUIERDA (TECLA S)
            if (gemas_recogidas == 3) {
               disparar_bala2_nivel3 = 1;
               bala2_nivel3.x = superheroe3.x;
               bala2_nivel3.y = superheroe3.y;
               disparo.play();
            }

            break;
         case 37: //El superhéroe se mueve hacia la IZQUIERDA
            if (superheroe3.x > 0)
               superheroe3.x -= 30;
            break;
         case 38: //El superhéroe se mueve hacia ARRIBA
            if (superheroe3.y > 10)
               superheroe3.y -= 30;
            break;
         case 39: //El superhéroe se mueve hacia la DERECHA
            if (superheroe3.x < 1400)
               superheroe3.x += 30;
            break;
         case 40: //El superhéroe se mueve hacia ABAJO
            if (superheroe3.y < 630)
               superheroe3.y += 30;

            break;
         default:

            break;
      }
   } else if (nivel == 2) { //Teclas correspondiente al nivel 2

      switch (keyCode) {
         case 32: //La nave dispara hacia la DERECHA (Barra espaciadora)
            nave_dispara = 1;
            disparoNave.x = naveEspacial.x + 100; //100
            disparoNave.y = naveEspacial.y + 40; //40

            break;
         default:
            break;
      }
   }

}


function jugar() { //Esta función controla que comience el juego.

   a = setInterval(jugar_nivel1, 1);

}


function mostrar() {
   var intro = document.getElementById('intro');
   intro.style.display = 'grid';

   var pauseB = document.getElementById('pause');
   pauseB.style.display = 'none';
}
function esconder() {
   var intro = document.getElementById('intro');
   intro.style.display = 'none';

   var pauseB = document.getElementById('pause');
   pauseB.style.display = 'grid';
}



var botonPause = document.getElementById("botonPause");
botonPause.addEventListener("click", function () {

   if (nivel == 1) {
      pausa = a;
      clearInterval(a);
      a = pausa;
   } else if (nivel == 2) {
      pausa = b;
      clearInterval(b);
      b = pausa;
   } else if (nivel == 3) {
      pausa = c;
      clearInterval(c);
      c = pausa;
   } else {
      clearInterval(pausa);

   }

   mostrar();

}, false);

//Funciones pausa de juego 1
function pausa() {
   if (nivel == 1) {
      pausa = a;
      clearInterval(a);
      a = pausa;
   } else if (nivel == 2) {
      pausa = b;
      clearInterval(b);
      b = pausa;
   } else if (nivel == 3) {
      pausa = c;
      clearInterval(c);
      c = pausa;
   } else {
      clearInterval(pausa);
   }

   mostrar();
}

function reanudar() {
   if (nivel == 1) {
      a = setInterval(jugar_nivel1, 1);
   } else if (nivel == 2) {
      b = setInterval(jugar_nivel2, 1);
   } else if (nivel == 3) {
      c = setInterval(jugar_nivel3, 1);
   } else {
      console.log("nada");
   }
   esconder();
}
//Aqui habria que reiniciar la posicion del personaje
function reiniciar() {
   if (nivel == 1) {
      superheroe1 = new Personaje(20, 520, 100, 100, 0);
      reiniciar_nivel1();
      a = setInterval(jugar_nivel1, 1);
   } else if (nivel == 2) {
      // alert("res2");
      reiniciar_nivel2();
      clearInterval(b);
      b = setInterval(jugar_nivel2, 1);
   } else if (nivel == 3) {
      // alert("res3");
      reiniciar_nivel3();
      clearInterval(c);
      c = setInterval(jugar_nivel3, 1);
   } else {
      console.log("nada");
   }
   esconder();
}



//jugar(); //Llamamos a la función jugar() para que se muestre en pantalla todo lo relacionado con el primer nivel.

/////////////////////////////////////////////////////

// A PARTIR DE AQUÍ COMIENZA EL NIVEL 2

/////////////////////////////////////////////////////

// PERSONAJES NIVEL 2

var flechaArriba = false; // Para controlar los eventos sobre la flecha
var nave_dispara = 0;

var naveEspacial = new Personaje(10, canvas.height / 2 - 150, 125, 100, 0);

var disparoNave = new Personaje(-500, -500, 80, 50);

var naveEnemiga = new Personaje(1700, 200, 150, 150, 0);
var choque_naveEnemiga1 = 0;
var nave1desaparece = 0;

var naveEnemiga2 = new Personaje(2000, 500, 300, 150, 0);
var choque_naveEnemiga2 = 0;
var nave2desaparece = 0;

var naveEnemiga3 = new Personaje(2650, 80, 300, 150, 0);
var choque_naveEnemiga3 = 0;
var nave3desaparece = 0;

var naveEnemiga4 = new Personaje(3400, canvas.height / 2, 300, 150, 0);
var choque_naveEnemiga4 = 0;
var nave4desaparece = 0;

var disparo_nave_enemiga = new Personaje(naveEnemiga.x, naveEnemiga.y + 40, 80, 50, 0);
var choque_disparoEnemigo = 0;

var disparo_nave_enemiga2 = new Personaje(naveEnemiga2.x, naveEnemiga2.y + 40, 80, 50, 0);
var choque_disparoEnemigo2 = 0;

var disparo_nave_enemiga3 = new Personaje(naveEnemiga3.x, naveEnemiga3.y + 40, 80, 50, 0);
var choque_disparoEnemigo3 = 0;

var disparo_nave_enemiga4 = new Personaje(naveEnemiga4.x, naveEnemiga4.y + 40, 80, 50, 0);
var choque_disparoEnemigo4 = 0;

var meteorito_1 = new Personaje(1400, 100, 80, 80, 0);
var choque_meteorito1 = 0;

var meteorito_2 = new Personaje(1950, 200, 80, 80, 0);
var choque_meteorito2 = 0;

var meteorito_3 = new Personaje(1600, 580, 80, 80, 0);
var choque_meteorito3 = 0;

var meteorito_4 = new Personaje(2900, 320, 80, 80, 0);
var choque_meteorito4 = 0;

var meteorito_5 = new Personaje(1800, 390, 80, 80, 0);
var choque_meteorito5 = 0;

var meteorito_6 = new Personaje(2300, 190, 80, 80, 0);
var choque_meteorito6 = 0;

var meteorito_7 = new Personaje(2600, 600, 80, 80, 0);
var choque_meteorito7 = 0;

var meteorito_8 = new Personaje(2500, 100, 80, 80, 0);
var choque_meteorito8 = 0;

var meteorito_9 = new Personaje(2400, 400, 80, 80, 0);
var choque_meteorito9 = 0;

var meteorito_10 = new Personaje(3200, 210, 80, 80, 0);
var choque_meteorito10 = 0;

var meteorito_11 = new Personaje(3250, 450, 80, 80, 0);
var choque_meteorito11 = 0;

var meteorito_12 = new Personaje(3400, 150, 80, 80, 0);
var choque_meteorito12 = 0;

var gamora = new Personaje(1300, canvas.height / 2, 150, 150, 0);
var gamora_salvada = 0;

var groot = new Personaje(2100, 230, 150, 150, 0);
var groot_salvado = 0;

var rocket = new Personaje(3000, 490, 150, 150, 0);
var rocket_salvado = 0;

var starlord = new Personaje(3700, 100 / 2, 150, 150, 0);
var starLord_salvado = 0;

//Asignamos las imágenes para cada personaje del nivel

var nave_espacial = new Image();
nave_espacial.src = "Personajes/nave_2.png";

var disparo_nave = new Image();
disparo_nave.src = "Personajes/disparo2.png"

var nave_enemiga = new Image();
nave_enemiga.src = "Personajes/nave_enemiga.png"

var nave_enemiga2 = new Image();
nave_enemiga2.src = "Personajes/nave_enemiga_2.png"

var nave_enemiga3 = new Image();
nave_enemiga3.src = "Personajes/nave_enemiga_3.png"

var nave_enemiga4 = new Image();
nave_enemiga4.src = "Personajes/nave_enemiga.png"

var disparoNaveEnemiga = new Image();
disparoNaveEnemiga.src = "Personajes/disparo_nave.png"

var disparoNaveEnemiga2 = new Image();
disparoNaveEnemiga2.src = "Personajes/disparo_nave.png"

var disparoNaveEnemiga3 = new Image();
disparoNaveEnemiga3.src = "Personajes/disparo_nave.png"

var disparoNaveEnemiga4 = new Image();
disparoNaveEnemiga4.src = "Personajes/disparo_nave.png"

var meteorito1 = new Image(); //Meteorito 1
meteorito1.src = "Personajes/meteorito1.png";

var meteorito2 = new Image(); //Meteorito 2
meteorito2.src = "Personajes/meteorito1.png";

var meteorito3 = new Image(); //Meteorito 3
meteorito3.src = "Personajes/meteorito2.png";

var meteorito4 = new Image(); //Meteorito 1
meteorito4.src = "Personajes/meteorito1.png";

var meteorito5 = new Image(); //Meteorito 2
meteorito5.src = "Personajes/meteorito1.png";

var meteorito6 = new Image(); //Meteorito 3
meteorito6.src = "Personajes/meteorito2.png";

var meteorito7 = new Image(); //Meteorito 3
meteorito7.src = "Personajes/meteorito2.png";

var meteorito8 = new Image(); //Meteorito 1
meteorito8.src = "Personajes/meteorito1.png";

var meteorito9 = new Image(); //Meteorito 2
meteorito9.src = "Personajes/meteorito1.png";

var meteorito10 = new Image(); //Meteorito 3
meteorito10.src = "Personajes/meteorito2.png";

var meteorito11 = new Image(); //Meteorito 2
meteorito11.src = "Personajes/meteorito1.png";

var meteorito12 = new Image(); //Meteorito 3
meteorito12.src = "Personajes/meteorito2.png";

var gamora1 = new Image();
gamora1.src = "Personajes/gamora.png";

var groot1 = new Image();
groot1.src = "Personajes/groot.png";

var rocket1 = new Image();
rocket1.src = "Personajes/rocket.png";

var starLord1 = new Image();
starLord1.src = "Personajes/Star-Lord.png";

let explosion = new Audio();
explosion.src = "Sonidos/explosion.mp3"

let choque_nave = new Audio();
choque_nave.src = "Sonidos/choque_nave.mp3"

function ContadorDeSalvados_2(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy";
   contexto.fillText(text, x, y);
   contexto.fillText('Salvados', 750, 50);
}

//Esta función muestra por pantalla el número de vidas restantes

function ContadorDeVidas_2(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText('Vidas', 550, 50);
}

// Definimos dos funciones, una para cuando la flecha de arriba está pulsada y otra para cuando no lo está

function teclaPulsada(event) {
   if (event.keyCode == 38) {
      flechaArriba = true;
   }
}

function teclaSinPulsar(event) {
   if (event.keyCode == 38) {
      flechaArriba = false;
   }
}

function dibujarFondo2() {

   ctx.drawImage(img2, 0, 0, canvas.width, canvas.height);

}

function jugar_nivel2() {
   clearRect();
   dibujarFondo2();

   ctx.drawImage(nave_espacial, naveEspacial.x, naveEspacial.y, naveEspacial.h, naveEspacial.w);

   if (nave_dispara == 1) {
      ctx.drawImage(disparo_nave, disparoNave.x, disparoNave.y, disparoNave.h, disparoNave.w);
      ctx.stroke();
      mover_disparo_nave();
   }

   if (choque_naveEnemiga1 != 1 && nave1desaparece != 1) {
      ctx.drawImage(nave_enemiga, naveEnemiga.x, naveEnemiga.y, naveEnemiga.h, naveEnemiga.w);
   }

   if (choque_naveEnemiga2 != 1 && nave2desaparece != 1) {
      ctx.drawImage(nave_enemiga2, naveEnemiga2.x, naveEnemiga2.y, naveEnemiga2.h, naveEnemiga2.w);
   }

   if (choque_naveEnemiga3 != 1 && nave3desaparece != 1) {
      ctx.drawImage(nave_enemiga3, naveEnemiga3.x, naveEnemiga3.y, naveEnemiga3.h, naveEnemiga3.w);
   }

   if (choque_naveEnemiga4 != 1 && nave4desaparece != 1) {
      ctx.drawImage(nave_enemiga4, naveEnemiga4.x, naveEnemiga4.y, naveEnemiga4.h, naveEnemiga4.w);
   }

   if (choque_disparoEnemigo != 1) {
      ctx.drawImage(disparoNaveEnemiga, disparo_nave_enemiga.x, disparo_nave_enemiga.y, disparo_nave_enemiga.h, disparo_nave_enemiga.w);
   }

   if (choque_disparoEnemigo2 != 1) {
      ctx.drawImage(disparoNaveEnemiga2, disparo_nave_enemiga2.x, disparo_nave_enemiga2.y, disparo_nave_enemiga2.h, disparo_nave_enemiga2.w);
   }

   if (choque_disparoEnemigo3 != 1) {
      ctx.drawImage(disparoNaveEnemiga3, disparo_nave_enemiga3.x, disparo_nave_enemiga3.y, disparo_nave_enemiga3.h, disparo_nave_enemiga3.w);
   }

   if (choque_disparoEnemigo4 != 1) {
      ctx.drawImage(disparoNaveEnemiga4, disparo_nave_enemiga4.x, disparo_nave_enemiga4.y, disparo_nave_enemiga4.h, disparo_nave_enemiga4.w);
   }

   if (choque_meteorito1 != 1) {
      ctx.drawImage(meteorito1, meteorito_1.x, meteorito_1.y, meteorito_1.h, meteorito_1.w);
   }

   if (choque_meteorito2 != 1) {
      ctx.drawImage(meteorito2, meteorito_2.x, meteorito_2.y, meteorito_2.h, meteorito_2.w);
   }

   if (choque_meteorito3 != 1) {
      ctx.drawImage(meteorito3, meteorito_3.x, meteorito_3.y, meteorito_3.h, meteorito_3.w);

   }

   if (choque_meteorito4 != 1) {
      ctx.drawImage(meteorito4, meteorito_4.x, meteorito_4.y, meteorito_4.h, meteorito_4.w);
   }

   if (choque_meteorito5 != 1) {
      ctx.drawImage(meteorito5, meteorito_5.x, meteorito_5.y, meteorito_5.h, meteorito_5.w);
   }

   if (choque_meteorito6 != 1) {
      ctx.drawImage(meteorito6, meteorito_6.x, meteorito_6.y, meteorito_6.h, meteorito_6.w);
   }

   if (choque_meteorito7 != 1) {
      ctx.drawImage(meteorito7, meteorito_7.x, meteorito_7.y, meteorito_7.h, meteorito_7.w);
   }

   if (choque_meteorito8 != 1) {
      ctx.drawImage(meteorito8, meteorito_8.x, meteorito_8.y, meteorito_8.h, meteorito_8.w);
   }

   if (choque_meteorito9 != 1) {
      ctx.drawImage(meteorito9, meteorito_9.x, meteorito_9.y, meteorito_9.h, meteorito_9.w);
   }

   if (choque_meteorito10 != 1) {
      ctx.drawImage(meteorito10, meteorito_10.x, meteorito_10.y, meteorito_10.h, meteorito_10.w);
   }

   if (choque_meteorito11 != 1) {
      ctx.drawImage(meteorito11, meteorito_11.x, meteorito_11.y, meteorito_11.h, meteorito_11.w);
   }

   if (choque_meteorito12 != 1) {
      ctx.drawImage(meteorito12, meteorito_12.x, meteorito_12.y, meteorito_12.h, meteorito_12.w);
   }

   if (gamora_salvada != 1) {
      ctx.drawImage(gamora1, gamora.x, gamora.y, gamora.h, gamora.w);
   }

   if (groot_salvado != 1) {
      ctx.drawImage(groot1, groot.x, groot.y, groot.h, groot.w);
   }

   if (rocket_salvado != 1) {
      ctx.drawImage(rocket1, rocket.x, rocket.y, rocket.h, rocket.w);
   }

   if (starLord_salvado != 1) {
      ctx.drawImage(starLord1, starlord.x, starlord.y, starlord.h, starlord.w);
   }

   // Definimos los eventos para la flecha
   window.addEventListener("keydown", teclaPulsada, false);
   window.addEventListener("keyup", teclaSinPulsar, false);

   choque_nave_enemiga();

   mover_nave_enemiga(naveEnemiga);
   mover_disparoEnemigo(disparo_nave_enemiga);
   choque_disparo_enemigo1(disparo_nave_enemiga);

   mover_nave_enemiga(naveEnemiga2);
   mover_disparoEnemigo(disparo_nave_enemiga2);
   choque_disparo_enemigo2(disparo_nave_enemiga2);

   mover_nave_enemiga(naveEnemiga3);
   mover_disparoEnemigo(disparo_nave_enemiga3);
   choque_disparo_enemigo3(disparo_nave_enemiga3);

   mover_nave_enemiga(naveEnemiga4);
   mover_disparoEnemigo(disparo_nave_enemiga4);
   choque_disparo_enemigo4(disparo_nave_enemiga4);

   nave_enemiga_destruida();

   mover_meteorito(meteorito_1);
   mover_meteorito(meteorito_2);
   mover_meteorito(meteorito_3);
   mover_meteorito(meteorito_4);
   mover_meteorito(meteorito_5);
   mover_meteorito(meteorito_6);
   mover_meteorito(meteorito_6);
   mover_meteorito(meteorito_7);
   mover_meteorito(meteorito_8);
   mover_meteorito(meteorito_9);
   mover_meteorito(meteorito_10);
   mover_meteorito(meteorito_11);
   mover_meteorito(meteorito_12);

   ContadorDeVidas_2(naveEspacial.vidas, 590, 90);
   choque_meteorito();

   mover_personaje(gamora);
   mover_personaje(groot);
   mover_personaje(rocket);
   mover_personaje(starlord);

   comprobar_salvados_nivel2();

   ContadorDeSalvados_2(naveEspacial.score, 830, 90);

   // Comprobamos si estamos o no pulsando la flecha de arriba y en caso de no estar pulsándola la nave desciende como si hubiese gravedad

   if (flechaArriba && naveEspacial.y > 0) {
      naveEspacial.y -= 1.5;
   } else if (!flechaArriba && naveEspacial.y < 650) {
      naveEspacial.y += 1.5;
   }

   if (naveEspacial.score == 4 && nave1desaparece == 1 && nave2desaparece == 1 && nave3desaparece == 1 && nave4desaparece == 1) {

      nivel = 3;

      //IMPORTANTE: Hay salir del "setInterval" para no quedarnos en un bucle.
      clearInterval(b);

      //Limpiamos el canvas antes de dibujar el nuevo mapa con sus nuevos elementos.
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      c = setInterval(jugar_nivel3, 1);

   } else
      if (starlord.x < 0) {
         alert("No has completado el nivel. Debes salvar a todos tus compañeros y derribar todas las naves enemigas.");
         reiniciar_nivel2();
      }

}

//Las siguientes funciones sirven para mover los elementos que conforman el nivel y que el jugador deberá destruir, esquivar o salvar.

function mover_nave_enemiga(nave) {

   nave.x -= 1;

}

function mover_disparoEnemigo(disparo) {

   disparo.x -= 1.5;

}

function mover_disparo_nave() {

   disparoNave.x += 1.5;

}

function mover_meteorito(meteorito) {

   meteorito.x -= 1;

}

function mover_personaje(personaje) {

   personaje.x -= 1;

}

//Esta función sirve para comprobar si la nave está en contacto con algún personaje. En caso afirmativo, se aumentará el contador de "Personas Salvadas"
function comprobar_salvados_nivel2() {

   if (naveEspacial.x >= gamora.x && gamora.x > 0 && gamora.x <= naveEspacial.x + 5 &&
      naveEspacial.y >= gamora.y - 100 && naveEspacial.y <= gamora.y + 100 && gamora_salvada != 1) {

      naveEspacial.score++;
      gamora_salvada = 1;
      sonido_salvar.play();
   }
   if (naveEspacial.x >= groot.x && groot.x > 0 && groot.x <= naveEspacial.x + 5 &&
      naveEspacial.y >= groot.y - 100 && naveEspacial.y <= groot.y + 100 && groot_salvado != 1) {

      naveEspacial.score++;
      groot_salvado = 1;
      sonido_salvar.play();
   }
   if (naveEspacial.x >= rocket.x && rocket.x > 0 && rocket.x <= naveEspacial.x + 5 &&
      naveEspacial.y >= rocket.y - 100 && naveEspacial.y <= rocket.y + 100 && rocket_salvado != 1) {

      naveEspacial.score++;
      rocket_salvado = 1;
      sonido_salvar.play();
   }
   if (naveEspacial.x >= starlord.x && starlord.x > 0 && starlord.x <= naveEspacial.x + 5 &&
      naveEspacial.y >= starlord.y - 100 && naveEspacial.y <= starlord.y + 100 && starLord_salvado != 1) {

      naveEspacial.score++;
      starLord_salvado = 1;
      sonido_salvar.play();
   }
}

//Las siguientes funciones sirven para comprobar si los disparos de las naves entran en contacto con nuestra nave.
function choque_disparo_enemigo1(disparo) {

   while (naveEspacial.x >= disparo.x && disparo.x > naveEspacial.x - 7 && disparo.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= disparo.y - 50 && naveEspacial.y <= disparo.y + 50 && choque_disparoEnemigo != 1) {
      choque_disparoEnemigo = 1;
      naveEspacial.vidas -= 1;
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

}

function choque_disparo_enemigo2(disparo) {

   while (naveEspacial.x >= disparo.x && disparo.x > naveEspacial.x - 7 && disparo.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= disparo.y - 50 && naveEspacial.y <= disparo.y + 50 && choque_disparoEnemigo2 != 1) {
      choque_disparoEnemigo2 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();
      //  nave2desaparece = 1;
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

}

function choque_disparo_enemigo3(disparo) {

   while (naveEspacial.x >= disparo.x && disparo.x > naveEspacial.x - 7 && disparo.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= disparo.y - 50 && naveEspacial.y <= disparo.y + 50 && choque_disparoEnemigo3 != 1) {
      choque_disparoEnemigo3 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();


   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

}

function choque_disparo_enemigo4(disparo) {

   while (naveEspacial.x >= disparo.x && disparo.x > naveEspacial.x - 7 && disparo.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= disparo.y - 50 && naveEspacial.y <= disparo.y + 50 && choque_disparoEnemigo4 != 1) {
      choque_disparoEnemigo4 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

}

function choque_nave_enemiga() { //meteorito_1.x > naveEspacial.x -7  && meteorito_1.x <= naveEspacial.x + 7

   if (naveEspacial.x >= naveEnemiga.x && naveEnemiga.x > naveEspacial.x - 7 && naveEnemiga.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= naveEnemiga.y - 50 && naveEspacial.y <= naveEnemiga.y + 50 && choque_naveEnemiga1 != 1) {

      choque_naveEnemiga1 = 1;
      naveEspacial.vidas -= 1;
      flechaArriba = false;
      choque_nave.play();
   }

   if (naveEspacial.x >= naveEnemiga2.x && naveEnemiga2.x > naveEspacial.x - 300 &&
      naveEspacial.y >= naveEnemiga2.y - 50 && naveEspacial.y <= naveEnemiga2.y + 50 && choque_naveEnemiga2 != 1) {

      choque_naveEnemiga2 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();

   }

   if (naveEspacial.x >= naveEnemiga3.x && naveEnemiga3.x > naveEspacial.x - 300 &&
      naveEspacial.y >= naveEnemiga3.y - 50 && naveEspacial.y <= naveEnemiga3.y + 50 && choque_naveEnemiga3 != 1) {

      choque_naveEnemiga3 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();

   }

   if (naveEspacial.x >= naveEnemiga4.x && naveEnemiga4.x > naveEspacial.x - 300 &&
      naveEspacial.y >= naveEnemiga4.y - 50 && naveEspacial.y <= naveEnemiga4.y + 50 && choque_naveEnemiga4 != 1) {

      choque_naveEnemiga4 = 1;
      naveEspacial.vidas -= 1;
      choque_nave.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();

   }
}



function choque_meteorito() {

   if (naveEspacial.x >= meteorito_1.x && meteorito_1.x > naveEspacial.x - 7 && meteorito_1.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_1.y - 50 && naveEspacial.y <= meteorito_1.y + 50 && choque_meteorito1 != 1) {

      choque_meteorito1 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();

   }

   if (naveEspacial.x >= meteorito_2.x && meteorito_2.x > naveEspacial.x - 7 && meteorito_2.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_2.y - 50 && naveEspacial.y <= meteorito_2.y + 50 && choque_meteorito2 != 1) {

      choque_meteorito2 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();
   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

   if (naveEspacial.x >= meteorito_3.x && meteorito3.x == 0 && meteorito_3.x > naveEspacial.x - 7 && meteorito_3.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_3.y - 50 && naveEspacial.y <= meteorito_3.y + 50 && choque_meteorito3 != 1) {

      choque_meteorito3 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

   if (naveEspacial.x >= meteorito_4.x && meteorito_4.x > naveEspacial.x - 7 && meteorito_4.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_4.y - 50 && naveEspacial.y <= meteorito_4.y + 50 && choque_meteorito4 != 1) {

      choque_meteorito4 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

   if (naveEspacial.x >= meteorito_5.x && meteorito_5.x > naveEspacial.x - 7 && meteorito_5.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_5.y - 50 && naveEspacial.y <= meteorito_5.y + 50 && choque_meteorito5 != 1) {

      choque_meteorito5 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();
   }

   if (naveEspacial.x >= meteorito_6.x && meteorito_6.x > naveEspacial.x - 7 && meteorito_6.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_6.y - 50 && naveEspacial.y <= meteorito_6.y + 50 && choque_meteorito6 != 1) {

      choque_meteorito6 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
   if (naveEspacial.x >= meteorito_7.x && meteorito_7.x > naveEspacial.x - 7 && meteorito_7.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_7.y - 50 && naveEspacial.y <= meteorito_7.y + 50 && choque_meteorito7 != 1) {
      choque_meteorito7 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
   if (naveEspacial.x >= meteorito_8.x && meteorito_8.x > naveEspacial.x - 7 && meteorito_8.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_8.y - 50 && naveEspacial.y <= meteorito_8.y + 50 && choque_meteorito8 != 1) {
      choque_meteorito8 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();

   }
   if (meteorito_9.x > naveEspacial.x - 7 && meteorito_9.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_9.y - 50 && naveEspacial.y <= meteorito_9.y + 50 && choque_meteorito9 != 1) {
      choque_meteorito9 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
   if (naveEspacial.x >= meteorito_10.x && meteorito_10.x > naveEspacial.x - 7 && meteorito_10.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_10.y - 50 && naveEspacial.y <= meteorito_10.y + 50 && choque_meteorito10 != 1) {
      choque_meteorito10 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
   if (naveEspacial.x >= meteorito_11.x && meteorito_11.x > naveEspacial.x - 7 && meteorito_11.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_11.y - 50 && naveEspacial.y <= meteorito_11.y + 50 && choque_meteorito11 != 1) {
      choque_meteorito11 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
   if (naveEspacial.x >= meteorito_12.x && meteorito_12.x > naveEspacial.x - 7 && meteorito_12.x <= naveEspacial.x + 7 &&
      naveEspacial.y >= meteorito_12.y - 50 && naveEspacial.y <= meteorito_12.y + 50 && choque_meteorito12 != 1) {
      choque_meteorito12 = 1;
      naveEspacial.vidas -= 1;
      naveEspacial.x = 30;
      naveEspacial.y = canvas.height / 2 - 150;
      flechaArriba = false;
      explosion.play();

   }

   if (naveEspacial.vidas == 0) {
      alert("Se han acabado las vidas")
      reiniciar_nivel2();


   }
}

function nave_enemiga_destruida() {

   if (disparoNave.x >= naveEnemiga.x
      && naveEnemiga.x > disparoNave.x - 100
      && disparoNave.y >= naveEnemiga.y - 100
      && disparoNave.y <= naveEnemiga.y + 100
      && nave1desaparece != 1) {

      flechaArriba = false;
      nave1desaparece = 1;
      choque_nave.play();
      naveEnemiga.x = -300;


   }
   if (disparoNave.x >= naveEnemiga2.x
      && naveEnemiga2.x > disparoNave.x - 100
      && disparoNave.y >= naveEnemiga2.y - 100
      && disparoNave.y <= naveEnemiga2.y + 100
      && nave2desaparece != 1) {

      flechaArriba = false;
      nave2desaparece = 1;
      choque_nave.play();
      naveEnemiga2.x = -300


   }
   if (disparoNave.x >= naveEnemiga3.x
      && naveEnemiga3.x > disparoNave.x - 100
      && disparoNave.y >= naveEnemiga3.y - 100
      && disparoNave.y <= naveEnemiga3.y + 100
      && nave3desaparece != 1) {

      flechaArriba = false;
      nave3desaparece = 1;
      choque_nave.play();
      naveEnemiga3.x = -300;
   }

   if (disparoNave.x >= naveEnemiga4.x
      && naveEnemiga4.x > disparoNave.x - 100
      && disparoNave.y >= naveEnemiga4.y - 100
      && disparoNave.y <= naveEnemiga4.y + 100
      && nave4desaparece != 1) {

      flechaArriba = false;
      nave4desaparece = 1;
      choque_nave.play();
      naveEnemiga4.x = -300;

   }

}

//Hay que volver a poner las variables en sus posiciones originales antes de volver a ejecutar el nivel
function reiniciar_nivel2() {

   naveEspacial.vidas = 3;
   naveEspacial.score = 0;
   nave_dispara = 0;
   disparoNave.x = -500;
   disparoNave.y = -500;


   choque_meteorito1 = 0;
   choque_meteorito2 = 0;
   choque_meteorito3 = 0;
   choque_meteorito4 = 0;
   choque_meteorito5 = 0;
   choque_meteorito6 = 0;
   choque_meteorito7 = 0;
   choque_meteorito8 = 0;
   choque_meteorito9 = 0;
   choque_meteorito10 = 0;
   choque_meteorito11 = 0;
   choque_meteorito12 = 0;
   meteorito_1.x = 1400;
   meteorito_2.x = 1600;
   meteorito_3.x = 1950;
   meteorito_4.x = 2900;
   meteorito_5.x = 1800;
   meteorito_6.x = 2300;
   meteorito_7.x = 2600;
   meteorito_8.x = 2500;
   meteorito_9.x = 2400;
   meteorito_10.x = 3200;
   meteorito_11.x = 3220;
   meteorito_12.x = 3250;

   gamora_salvada = 0;
   groot_salvado = 0;
   rocket_salvado = 0;
   starLord_salvado = 0;
   groot.x = 2100;
   rocket.x = 3000;
   starlord.x = 3700;
   gamora.x = 1300;

   flechaArriba = false;

   choque_disparoEnemigo = 0;
   choque_disparoEnemigo2 = 0;
   choque_disparoEnemigo3 = 0;
   choque_disparoEnemigo4 = 0;

   choque_naveEnemiga1 = 0;
   choque_naveEnemiga2 = 0;
   choque_naveEnemiga3 = 0;
   choque_naveEnemiga4 = 0;

   naveEnemiga.x = 1700;
   naveEnemiga2.x = 2000;
   naveEnemiga3.x = 2650;
   naveEnemiga4.x = 3400;

   nave1desaparece = 0;
   nave2desaparece = 0;
   nave3desaparece = 0;
   nave4desaparece = 0;


   disparo_nave_enemiga.x = 1700;
   disparo_nave_enemiga2.x = 2000;
   disparo_nave_enemiga3.x = 2650;
   disparo_nave_enemiga4.x = 3400;

}

/////////////////////////////////////////////////////

// A PARTIR DE AQUÍ COMIENZA EL NIVEL 3

/////////////////////////////////////////////////////

var superheroe3 = new Personaje(50, 520, 100, 100, 0)

var enemigo_final = new Personaje(1100, 120, 125, 125, 0) //Thanos
var enemigo_final_golpeado = 0; //Esta variable comprobará si ha disparado al enemigo.
enemigo_final.vidas = 3;

var ironman = new Image(); //Abrimos la imagen
ironman.src = "Personajes/Iron_man.png"

direccionx = 0; //Direccion inicial de Thanos
direcciony = 0; //Direccion final de Thanos

direccionx_roca1 = 0;
direcciony_roca1 = 0;

direccionx_roca2 = 0;
direcciony_roca2 = 0;


function reiniciar_nivel3() {
   superheroe3 = new Personaje(50, 520, 100, 100, 0);
   enemigo_final = new Personaje(1100, 120, 125, 125, 0);
   enemigo_final_golpeado = 0;
   enemigo_final.vidas = 3;

   direccionx = 0; //Direccion inicial de Thanos
   direcciony = 0; //Direccion final de Thanos

   direccionx_roca1 = 0;
   direcciony_roca1 = 0;

   direccionx_roca2 = 0;
   direcciony_roca2 = 0;

   gemas_recogidas = 0;
   gema1_recogida = 0;
   gema2_recogida = 0;
   gema3_recogida = 0;
   genmas_restantes = 3;


}

var thanos2 = new Image(); //Abrimos la imagen
thanos2.src = "Personajes/thanos.png"

var misil1_nivel3 = new Image(); //El superhéroe disparará hacia la derecha
misil1_nivel3.src = "Personajes/bala_derecha_nivel3.png"

var misil2_nivel3 = new Image(); //El superhéroe disparará hacia la izquierda
misil2_nivel3.src = "Personajes/bala_izquierda_nivel3.png"

var meteorito1_nivel3 = new Image(); //Meteorito 1
meteorito1_nivel3.src = "Personajes/meteorito1.png";

var meteorito2_nivel3 = new Image(); //Meteorito 2
meteorito2_nivel3.src = "Personajes/meteorito2.png";

var gema1 = new Image();
gema1.src = "Personajes/gema_morada.png"
var direccion_gema1 = 0;

var gema2 = new Image();
gema2.src = "Personajes/gema_azul.png"
var direccion_gema2 = 0;

var gema3 = new Image();
gema3.src = "Personajes/gema_naranja.png"
var direccion_gema3 = 0;

var gemas_recogidas = 0;
var genmas_restantes = 3;

var gema1_recogida = 0;
var gema2_recogida = 0;
var gema3_recogida = 0;


var gema_morada = new rectangulo(1150, 100, 40, 40)

var gema_azul = new rectangulo(200, 100, 40, 40)

var gema_naranja = new rectangulo(1000, 600, 40, 40)

var bala1_nivel3 = new rectangulo(superheroe3.x - 40, superheroe3.y + 40, 40, 80)
var bala2_nivel3 = new rectangulo(superheroe3.x - 40, superheroe3.y + 40, 40, 80)

var disparo_thanos = new rectangulo(alienigena_1.x, alienigena_1.y + 10, 40, 80) //Proyectil proveniente del primer alienígena
var disparo1_thanos = new rectangulo(alienigena_2.x, alienigena_2.y + 10, 40, 80) //Proyectil proveniente del segundo alienígena

var roca_1_nivel3 = new Personaje(1400, 200, 80, 80, 0);
var choque_roca1_nivel3 = 0;

var roca_2_nivel3 = new Personaje(1200, 400, 80, 80, 0);
var choque_roca2_nivel3 = 0;

var disparar_bala_nivel3 = 0; //Variable que controla la bala hacia la derecha
var disparar_bala2_nivel3 = 0; //Variable que controla la bala hacia la izquierda

function dibujarFondo3() {
   ctx.drawImage(img3, 0, 0, canvas.width, canvas.height);
   ctx.drawImage(ironman, superheroe3.x, superheroe3.y, superheroe3.h, superheroe3.w);




}


function jugar_nivel3() {
   clearRect();
   dibujarFondo3();

   if (gema1_recogida == 0) {
      ctx.drawImage(gema1, gema_morada.x, gema_morada.y, gema_morada.h, gema_morada.w)
      mover_gema1();
   }
   if (gema2_recogida == 0) {
      ctx.drawImage(gema2, gema_azul.x, gema_azul.y, gema_azul.h, gema_azul.w)
      mover_gema2();
   }
   if (gema3_recogida == 0) {
      ctx.drawImage(gema3, gema_naranja.x, gema_naranja.y, gema_naranja.h, gema_naranja.w)
      mover_gema3();
   }
   comprobar_gemas_recogidas()




   if (disparar_bala_nivel3 == 1) {

      ctx.drawImage(misil1_nivel3, bala1_nivel3.x, bala1_nivel3.y, bala1_nivel3.h, bala1_nivel3.w)
      ctx.stroke();
      bala_movimiento_nivel3();
   }

   if (disparar_bala2_nivel3 == 1) {

      ctx.drawImage(misil2_nivel3, bala2_nivel3.x, bala2_nivel3.y, bala2_nivel3.h, bala2_nivel3.w)
      ctx.stroke();
      bala_movimiento2_nivel3()

   }

   mover_enemigofinal();

   if (enemigo_final_golpeado != 1 && enemigo_final.vidas > 0) {
      ctx.drawImage(thanos2, enemigo_final.x, enemigo_final.y, enemigo_final.h, enemigo_final.w);

   }

   if (enemigo_final_golpeado != 1 && enemigo_final.vidas > 0) {
      ctx.drawImage(fuego, disparo_thanos.x, disparo_thanos.y, disparo_thanos.h, disparo_thanos.w);
      ctx.drawImage(fuego, disparo1_thanos.x, disparo1_thanos.y, disparo1_thanos.h, disparo1_thanos.w)
      ctx.stroke();
      disparo_thanos_movimiento();
      disparo1_thanos_movimiento();

   }

   mover_roca1();


   ctx.drawImage(meteorito1_nivel3, roca_1_nivel3.x, roca_1_nivel3.y, roca_1_nivel3.h, roca_1_nivel3.w);

   mover_roca2();

   ctx.drawImage(meteorito2_nivel3, roca_2_nivel3.x, roca_2_nivel3.y, roca_2_nivel3.h, roca_2_nivel3.w);

   //En caso de que se haya salvado a una persona se modifica el contador
   ContadorDeVidaEnemigo(enemigo_final.vidas, 370, 90);
   //En caso de que se pierda una vida se modifica el contador
   ContadorDeVidas3(superheroe3.vidas, 670, 90)
   ContadorDeGemasRecogidas(genmas_restantes, 980, 90)

   comprobar_choque_enemigofinal();

   if (enemigo_final.vidas == 0) {

      clearInterval(c);
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img4, 0, 0, canvas.width, canvas.height);
      contexto.fillStyle = "#000000";
      contexto.font = "italic 65px SF Distant Galaxy ";
      contexto.fillText('¡Enhorabuena,', 440, 275);
      contexto.fillText('has completado', 380, 375);
      contexto.fillText('el juego!', 510, 475);

      const myTimeout = setTimeout(alerta, 3000);

      function alerta() {
         alert("Felicidades, has derrotado al enemigo final. Pulse 'Aceptar' para volver al menú principal");
         history.go(-2);
      }

   
   }
}

function bala_movimiento_nivel3() {

   //Comprobamos si la bala toca a Thanos
   if (!(bala1_nivel3.x <= enemigo_final.x + 40 && bala1_nivel3.x >= enemigo_final.x - 40 && bala1_nivel3.y >= enemigo_final.y - 40 && bala1_nivel3.y <= enemigo_final.y + 90 && enemigo_final_golpeado == 0)) {
      bala1_nivel3.x = bala1_nivel3.x + 2;
   }
   else {
      enemigo_final.vidas--;
      bala1_nivel3.x = 1500;
      grito_enemigo.play();
   }


}

function bala_movimiento2_nivel3() {

   //Comprobamos si la bala toca a Thanos
   if (!(bala2_nivel3.x <= enemigo_final.x + 40 && bala2_nivel3.x >= enemigo_final.x - 40 && bala2_nivel3.y >= enemigo_final.y - 40 && bala2_nivel3.y <= enemigo_final.y + 90 && enemigo_final_golpeado == 0)) {
      bala2_nivel3.x = bala2_nivel3.x - 2;
   }
   else {
      enemigo_final_golpeado = 0;
      enemigo_final.vidas--;
      bala2_nivel3.x = -20;
      grito_enemigo.play();
   }

}

function comprobar_choque_enemigofinal() {
   if (superheroe3.x <= enemigo_final.x + 40 && superheroe3.x >= enemigo_final.x - 40 && superheroe3.y >= enemigo_final.y - 40 && superheroe3.y <= enemigo_final.y + 40 && enemigo_final_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe3.vidas--;
      superheroe3.x = 20;
      superheroe3.y = 20;
      grito.play();

      if (superheroe3.vidas == 0) {
         alert("Se han acabado las vidas")
         superheroe3.vidas = 3;
         enemigo_final.vidas = 3;
         enemigo_final_golpeado = 0
         superheroe3.score = 0;
         gemas_recogidas = 0;
         gema1_recogida = 0;
         gema2_recogida = 0;
         gema3_recogida = 0;
         genmas_restantes = 3;

      }
   }

   if (superheroe3.x <= roca_1_nivel3.x + 40 && superheroe3.x >= roca_1_nivel3.x - 40 && superheroe3.y >= roca_1_nivel3.y - 40 && superheroe3.y <= roca_1_nivel3.y + 40) { //Si está en la misma posición que una persona aumenta el contador
      superheroe3.vidas--;
      superheroe3.x = 20;
      superheroe3.y = 20;
      grito.play();

      if (superheroe3.vidas == 0) {
         alert("Se han acabado las vidas")
         superheroe3.vidas = 3;
         enemigo_final.vidas = 3;
         enemigo_final_golpeado = 0
         superheroe3.score = 0;
         gemas_recogidas = 0;
         gema1_recogida = 0;
         gema2_recogida = 0;
         gema3_recogida = 0;
         genmas_restantes = 3;

      }
   }

   if (superheroe3.x <= roca_2_nivel3.x + 40 && superheroe3.x >= roca_2_nivel3.x - 40 && superheroe3.y >= roca_2_nivel3.y - 40 && superheroe3.y <= roca_2_nivel3.y + 40) { //Si está en la misma posición que una persona aumenta el contador
      superheroe3.vidas--;
      superheroe3.x = 20;
      superheroe3.y = 20;
      grito.play();

      if (superheroe3.vidas == 0) {
         alert("Se han acabado las vidas")
         superheroe3.vidas = 3;
         enemigo_final.vidas = 3;
         enemigo_final_golpeado = 0
         superheroe3.score = 0;
         gemas_recogidas = 0;
         gema1_recogida = 0;
         gema2_recogida = 0;
         gema3_recogida = 0;
         genmas_restantes = 3;

      }
   }

}

function mover_enemigofinal() {
   if (direccionx == 0) {
      enemigo_final.x++;
   }
   else {
      enemigo_final.x--;
   }
   if (enemigo_final.x == 1480) {
      direccionx = 1;
   }
   if (enemigo_final.x == 10) {
      direccionx = 0;
   }
   if (direcciony == 0) {
      enemigo_final.y++;
   }
   else {
      enemigo_final.y--;
   }
   if (enemigo_final.y == 700) {
      direcciony = 1;
   }
   if (enemigo_final.y == 10) {
      direcciony = 0;
   }
}

function mover_roca1() {
   if (direccionx_roca1 == 0) {
      roca_1_nivel3.x++;
   }
   else {
      roca_1_nivel3.x--;
   }
   if (roca_1_nivel3.x == 1480) {
      direccionx_roca1 = 1;
   }
   if (roca_1_nivel3.x == 10) {
      direccionx_roca1 = 0;
   }
   if (direcciony_roca1 == 0) {
      roca_1_nivel3.y++;
   }
   else {
      roca_1_nivel3.y--;
   }
   if (roca_1_nivel3.y == 730) {
      direcciony_roca1 = 1;
   }
   if (roca_1_nivel3.y == 10) {
      direcciony_roca1 = 0;
   }
}

function mover_roca2() {
   if (direccionx_roca2 == 0) {
      roca_2_nivel3.x++;
   }
   else {
      roca_2_nivel3.x--;
   }
   if (roca_2_nivel3.x == 1480) {
      direccionx_roca2 = 1;
   }
   if (roca_2_nivel3.x == 10) {
      direccionx_roca2 = 0;
   }
   if (direcciony_roca2 == 0) {
      roca_2_nivel3.y++;
   }
   else {
      roca_2_nivel3.y--;
   }
   if (roca_2_nivel3.y == 730) {
      direcciony_roca2 = 1;
   }
   if (roca_2_nivel3.y == 10) {
      direcciony_roca2 = 0;
   }
}

function ContadorDeVidaEnemigo(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText('Vidas Thanos', 220, 50);
}



function ContadorDeGemasRecogidas(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText('Gemas Restantes', 820, 50);
}

//Esta función muestra por pantalla el número de vidas restantes

function ContadorDeVidas3(text, x, y) {
   contexto.fillStyle = "#FFFFFF";
   contexto.font = "italic 40px SF Distant Galaxy ";
   contexto.fillText(text, x, y);
   contexto.fillText('Vidas', 620, 50);
}

function back() {
   history.back();
}

function disparo_thanos_movimiento() { //Disparo que sale dethanos hacia la izquierda
   disparo_thanos.x--;
   if (disparo_thanos.x == 0) {
      disparo_thanos.x = enemigo_final.x;
      disparo_thanos.y = enemigo_final.y;
   }
   if (superheroe3.x <= disparo_thanos.x + 40 && superheroe3.x >= disparo_thanos.x - 40 && superheroe3.y >= disparo_thanos.y - 40 && superheroe3.y <= disparo_thanos.y + 60 && enemigo_final_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe3.vidas--;
      superheroe3.x = 20;
      superheroe3.y = 20;
      disparo_thanos.x = enemigo_final.x;
      disparo_thanos.y = enemigo_final.y;
      grito.play();
   }
   if (superheroe3.vidas == 0) {
      alert("Se han acabado las vidas")
      superheroe3.vidas = 3;
      enemigo_final.vidas = 3;
      enemigo_final_golpeado = 0
      superheroe3.score = 0;
      gemas_recogidas = 0;
      gema1_recogida = 0;
      gema2_recogida = 0;
      gema3_recogida = 0;
      genmas_restantes = 3;

   }
}

function disparo1_thanos_movimiento() { //Disparo que sale de thanos hacia la derecha
   disparo1_thanos.x++;
   if (disparo1_thanos.x == 1500) {
      disparo1_thanos.x = enemigo_final.x;
      disparo1_thanos.y = enemigo_final.y;
   }
   if (superheroe3.x <= disparo1_thanos.x + 40 && superheroe3.x >= disparo1_thanos.x - 40 && superheroe3.y >= disparo1_thanos.y - 40 && superheroe3.y <= disparo1_thanos.y + 60 && enemigo_final_golpeado != 1) { //Si está en la misma posición que una persona aumenta el contador
      superheroe3.vidas--;
      superheroe3.x = 20;
      superheroe3.y = 20;
      disparo1_thanos.x = enemigo_final.x;
      disparo_thanos.y = enemigo_final.y;
      grito.play();
   }
   if (superheroe3.vidas == 0) {
      alert("Se han acabado las vidas")
      superheroe3.vidas = 3;
      enemigo_final.vidas = 3;
      enemigo_final_golpeado = 0
      superheroe3.score = 0;
      gemas_recogidas = 0;
      gema1_recogida = 0;
      gema2_recogida = 0;
      gema3_recogida = 0;
      genmas_restantes = 3;

   }
}
function mover_gema1() {
   if (direccion_gema1 == 0)
      gema_morada.x = gema_morada.x + 0.6;
   else
      gema_morada.x = gema_morada.x - 0.6;
   if (gema_morada.x > 1300)
      direccion_gema1 = 1;
   if (gema_morada.x < 1100)
      direccion_gema1 = 0;
}

function mover_gema2() {
   if (direccion_gema2 == 0)
      gema_azul.y = gema_azul.y + 0.6;
   else
      gema_azul.y = gema_azul.y - 0.6;
   if (gema_azul.y > 250)
      direccion_gema2 = 1;
   if (gema_azul.y < 50)
      direccion_gema2 = 0;
}

function mover_gema3() {
   if (direccion_gema3 == 0)
      gema_naranja.y = gema_naranja.y + 0.6;
   else
      gema_naranja.y = gema_naranja.y - 0.6;
   if (gema_naranja.y > 670)
      direccion_gema3 = 1;
   if (gema_naranja.y < 500)
      direccion_gema3 = 0;

}

function comprobar_gemas_recogidas() {
   if (superheroe3.x <= gema_morada.x + 40 && superheroe3.x >= gema_morada.x - 20 && superheroe3.y >= gema_morada.y - 40 && superheroe3.y <= gema_morada.y + 40 && gema1_recogida != 1) {
      gemas_recogidas++;
      genmas_restantes--;
      gema1_recogida = 1;
      sonido_salvar.play(); //Se activa el sonido que indica que la gema ha sido recogida
   }

   if (superheroe3.x <= gema_azul.x + 10 && superheroe3.x >= gema_azul.x - 60 && superheroe3.y >= gema_azul.y - 40 && superheroe3.y <= gema_azul.y + 40 && gema2_recogida != 1) {
      gemas_recogidas++;
      genmas_restantes--;
      gema2_recogida = 1;
      sonido_salvar.play();

   }

   if (superheroe3.x <= gema_naranja.x + 10 && superheroe3.x >= gema_naranja.x - 60 && superheroe3.y >= gema_naranja.y - 40 && superheroe3.y <= gema_naranja.y + 40 && gema3_recogida != 1) {
      gemas_recogidas++;
      genmas_restantes--;
      gema3_recogida = 1;
      sonido_salvar.play();

   }

}
//JQUERY
//Al entrar el ratón en el botón se hace más grande y cambia de color y al salir más pequeño y vuelve a cambiar de color
$(document).ready(function(){

$("button").mouseenter(function(){
   // $("button").animate({Width: "+=5px"});
    $(this).css("background-color", "blue");
    $(this).css("width", "350px");
  });

  $("button").mouseleave(function(){
  // $("button").animate({Width: "+=5px"});
   $(this).css("background-color", "rgb(184, 179, 179)");
   $(this).css("width", "210px");
 });

 $("#volverAtras").mouseenter(function(){
  //  $("input").animate({letterSpacing: "+=5px"});
    $(this).css("background-color", "blue");
    $(this).css("width", "200px");
  });

  $("#volverAtras").mouseleave(function(){
 //  $("input").animate({letterSpacing: "+=5px"});
   $(this).css("background-color", "rgb(184, 179, 179)");
   $(this).css("width", "100px");
 });

 $("#botonPause").mouseenter(function(){
   //  $("input").animate({letterSpacing: "+=5px"});
     $(this).css("background-color", "blue");
     $(this).css("width", "200px");
   });
 
   $("#botonPause").mouseleave(function(){
  //  $("input").animate({letterSpacing: "+=5px"});
    $(this).css("background-color", "rgb(184, 179, 179)");
    $(this).css("width", "100px");
 
  });


 });

