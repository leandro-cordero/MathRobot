const audio = document.getElementById("myAudio");

//________________________________________
// PERIMETROS  
//________________________________________
// Perimetro con todos los 4 lados iguales (Cuadrado)
function perimetro4LadosIguales(arista){
    audio.play()
    return arista * 4;
}

// Perimetro 4 lados con 2 lados iguales(Rectangulo)
function perimetro4Lados2Iguales(arista1, arista2){
    audio.play()
    return (arista1 * 2) + (arista2 * 2);
}

// Perimetro con todos los 3 lados iguales (Triangulo equilatero)
function perimetro3Lados(arista1, arista2, base){    
    audio.play()
    return parseInt(arista1) + parseInt(arista2) + parseInt(base);
}


//__________________
// AREAS
//__________________
// Area de Cuadrado
function areaCuadrado(arista){
    audio.play()
    return arista ** 2;
}

// Area base x altura (Rectangulo, Paralelogramo)
function areaBaseAltura(arista1, arista2){
    audio.play()
    return arista1 * arista2;
}

// Area base x altura / 2
function areaBaseAlturaEntre2(base, altura){
    audio.play()
    return (base * altura) / 2;
}

// Area de triangulo Equilatero y demas
function areaTrianguloEquiIso(arista1, base){
    const alturaTriangulo = (Math.sqrt((arista1 ** 2) - ((base / 2)** 2)));
    audio.play()
    return (base * alturaTriangulo) / 2;
}
function areaTrianguloEtc(arista1, arista2, base){
    const semiper = perimetro3Lados(arista1, arista2, base) / 2;      
    audio.play() 
    return Math.sqrt(semiper * (semiper - arista1) * (semiper - arista2) * (semiper - base));
}

// Area de Rombo
function areaRomboAngulo(arista, angulo){
    const radianes = (angulo * Math.PI) / 180;     
    audio.play() 
    return arista * arista * Math.sin(radianes);
}

//Area de Romboide
function areaRomboideAngulo(arista1, arista2, angulo){
    const radianes = (angulo * Math.PI) / 180;   
    audio.play()   
    return arista1 * arista2 * Math.sin(radianes);
}


// Perimetro y área de Circulo
const diametroCirculo = (radio) => radio * 2;

function perimetroCirculo(radio){
    const diametro = diametroCirculo(radio);
    audio.play()
    return diametro * Math.PI;
}

function areaCirculo(radio){
    audio.play()
    return (radio ** 2) * Math.PI;
}


//_____________________________
//Conectar con HTML
//_____________________________
// Llamado a cuadrado
function calcularPerimetroCuadrado() {
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#cuadradoResult");
    cardFooter.style.display = "block";

    const input = document.getElementById("InputCuadrado").value;    

    const perimetro = perimetro4LadosIguales(input);
    
    const resultado = document.getElementById("cuadradoPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}
function calcularAreaCuadrado(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#cuadradoResult");
    cardFooter.style.display = "block";

    const input = document.getElementById("InputCuadrado").value;
    
    const area = areaCuadrado(input);
    
    const resultado = document.getElementById("cuadradoArea");
    resultado.innerText = "The area is: " + area;
}

//Llamado a rectangulo
function calcularPerimetroRectangulo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#rectanguloResult");
    cardFooter.style.display = "block";

    const input1 = document.getElementById("InputRect1").value;
    const input2 = document.getElementById("InputRect2").value;

    const perimetro = perimetro4Lados2Iguales(input1, input2);
    
    const resultado = document.getElementById("rectanguloPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}
function calcularAreaRectangulo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#rectanguloResult");
    cardFooter.style.display = "block";

    const input1 = document.getElementById("InputRect1").value;
    const input2 = document.getElementById("InputRect2").value;

    const area = areaBaseAltura(input1, input2);
    
    const resultado = document.getElementById("rectanguloArea");
    resultado.innerText = "The area is: " + area;
}

// Llamado a triangulo
function calcularPerimetroTriangulo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#trianguloResult");
    cardFooter.style.display = "block";

    const input1 = document.getElementById("InputTriangulo1").value;
    const input2 = document.getElementById("InputTriangulo2").value;
    const inputBase = document.getElementById("InputTriangulo3").value;    

    const perimetro = perimetro3Lados(input1, input2, inputBase);

    const resultado = document.getElementById("trianguloPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}

function calcularAreaTriangulo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#trianguloResult");
    cardFooter.style.display = "block";

    const input1 = document.getElementById("InputTriangulo1").value;
    const input2 = document.getElementById("InputTriangulo2").value;
    const inputBase = document.getElementById("InputTriangulo3").value; 
    const check = document.querySelector('input[name="check"]:checked').value;    

    if (check == "eqis"){
        const area = areaTrianguloEquiIso(input1, inputBase);

        const resultado = document.getElementById("trianguloArea");
        resultado.innerText = "The area is: " + area;
    } else if (check == "rect"){
        const area = areaBaseAlturaEntre2(input2, inputBase);
        
        const resultado = document.getElementById("trianguloArea");
        resultado.innerText = "The area is: " + area;
    } else if (check == "otro"){
        const area = areaTrianguloEtc(input1, input2, inputBase);
        
        const resultado = document.getElementById("trianguloArea");
        resultado.innerText = "The area is: " + area;
    } else if (check != "eqis" | check != "rect" | check != "otro") {
        alert("Choose any type of triangle"); /* !!! */
    }
}

// Llamado a rombo
function calcularPerimetroRombo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#romboResult_1");
    cardFooter.style.display = "block";

    const input = document.getElementById("InputLado").value;
    
    const perimetro = perimetro4LadosIguales(input);
    
    const resultado = document.getElementById("romboPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}
function calcularAreaAngulo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#romboResult_1");
    cardFooter.style.display = "block";


    const lado = document.getElementById("InputLado").value;
    const angulo = document.getElementById("InputAngulo").value;

    const area = areaRomboAngulo(lado, angulo);
    
    const resultado = document.getElementById("romboArea_angle");
    resultado.innerText = "The area is: " + area;
}
function calcularAreaDiagonal(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#romboResult_2");
    cardFooter.style.display = "block";

    const d1 = document.getElementById("InputDiagonal1").value;
    const d2 = document.getElementById("InputDiagonal2").value;

    const area = areaBaseAlturaEntre2(d1, d2);
    
    const resultado = document.getElementById("romboArea_diagonals");
    resultado.innerText = "The area is: " + area;
}

//Llamando a romboide
function calcularPerimetroRomboide(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#paralelogramoResult_1");
    cardFooter.style.display = "block";

    const ladoA = document.getElementById("InputLadoA").value;
    const ladoB = document.getElementById("InputLadoB").value;

    const perimetro = perimetro4Lados2Iguales(ladoA, ladoB);
    
    const resultado = document.getElementById("paralelogramoPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}
function calcularAreaAnguloRomboide(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#paralelogramoResult_1");
    cardFooter.style.display = "block";

    const ladoA = document.getElementById("InputLadoA").value;
    const ladoB = document.getElementById("InputLadoB").value; 
    const angulo = document.getElementById("InputAnguloR").value;

    const area = areaRomboideAngulo(ladoA, ladoB, angulo);
    
    const resultado = document.getElementById("paralelogramoArea_angle");
    resultado.innerText = "The area is: " + area;
}
function calcularAreaAlturaRomboide(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#paralelogramoResult_2");
    cardFooter.style.display = "block";

    const ladoA = document.getElementById("InputLadoA").value;
    const altura = document.getElementById("InputAltura").value; 

    const area = areaBaseAltura(ladoA, altura);
    
    const resultado = document.getElementById("paralelogramoArea_height");
    resultado.innerText = "The area is: " + area;
}


// Llamado a circulo
function calcularPerimetroCirculo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#circuloResult");
    cardFooter.style.display = "block";

    // Logica
    const input = document.getElementById("InputCirculo");
    const valor = input.value;

    const perimetro = perimetroCirculo(valor);

    const resultado = document.getElementById("circuloPerimetro");
    resultado.innerText = "The perimeter is: " + perimetro;
}

function calcularAreaCirculo(){
    // Pintar el container del resultado
    const cardFooter = document.querySelector("#circuloResult");
    cardFooter.style.display = "block";

    const input = document.getElementById("InputCirculo");
    const valor = input.value;

    const area = areaCirculo(valor);

    const resultado = document.getElementById("circuloArea");
    resultado.innerText = "The area is: " + area;
}