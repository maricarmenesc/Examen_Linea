document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const exitRulesButton = document.getElementById('exit-rules-button');
    const continueButton = document.getElementById('continue-button');
    const nextButton = document.getElementById('next-button');
    const retryButton = document.getElementById('retry-button');
    const exitButton = document.getElementById('exit-button');
    const startScreen = document.getElementById('start-screen');
    const rulesScreen = document.getElementById('rules-screen');
    const examScreen = document.getElementById('exam-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const timerElement = document.getElementById('timer');
    const resultMessageElement = document.getElementById('result-message');

    let currentQuestionIndex = 0;
let score = 0;
let timer; // Referencia al intervalo del temporizador
let selectedQuestions = [];
let timeLeft = 15; // Tiempo restante para la pregunta actual


    const questions = [
        {
            question: '¿Cuál de las siguientes bases de datos ha sido compatible con PHP casi desde el principio?',
            answers: ['SQL', 'MySQL', 'Oracle Database', 'SQL+'],
            correct: 'MySQL'
        },
        {
            question: '¿Cuál es el propósito del modelo de caja en CSS?',
            answers: ['Permitir el diseño de cuadros de texto', 'Proporcionar un diseño de caja para el contenido', 'Permitir la alineación de elementos', 'Aplicar estilos a los cuadros de texto'],
            correct: 'Proporcionar un diseño de caja para el contenido'
        },
        {
            question: '¿Qué significa HTML?',
            answers: ['Hyper Text Markup Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language', 'Hyperlinking Text Markup Language'],
            correct: 'Hyper Text Markup Language'
        },
        {
            question: '¿Cuál es el propósito de JavaScript?',
            answers: ['Estilizar la página web', 'Proporcionar interactividad a la página web', 'Crear bases de datos', 'Diseñar la estructura de la página web'],
            correct: 'Proporcionar interactividad a la página web'
        },
        {
            question: '¿Qué es un framework en el desarrollo web?',
            answers: ['Una biblioteca de funciones', 'Un conjunto de herramientas y bibliotecas que proporcionan una estructura base', 'Un lenguaje de programación', 'Un editor de texto para desarrollar aplicaciones web'],
            correct: 'Un conjunto de herramientas y bibliotecas que proporcionan una estructura base'
        },
        {
            question: '¿Cuál es la función de CSS en una página web?',
            answers: ['Estructurar el contenido', 'Agregar interactividad', 'Aplicar estilos y diseño', 'Manejar la base de datos'],
            correct: 'Aplicar estilos y diseño'
        },
        {
            question: '¿Qué significa API?',
            answers: ['Application Programming Interface', 'Advanced Programming Integration', 'Application Protocol Interface', 'Advanced Protocol Integration'],
            correct: 'Application Programming Interface'
        },
        {
            question: '¿Qué es una SPA en desarrollo web?',
            answers: ['Single Page Application', 'Simple Page Application', 'Single Protocol Application', 'Simple Protocol Application'],
            correct: 'Single Page Application'
        },
        {
            question: '¿Qué tecnología se usa para crear estilos en una página web?',
            answers: ['HTML', 'CSS', 'JavaScript', 'PHP'],
            correct: 'CSS'
        },
        {
            question: '¿Cuál es el propósito del atributo "alt" en la etiqueta <img> en HTML?',
            answers: ['Aplicar estilos a la imagen', 'Definir la fuente de la imagen', 'Proveer texto alternativo para la imagen', 'Hacer la imagen interactiva'],
            correct: 'Proveer texto alternativo para la imagen'
        },
        {
            question: '¿Qué es el DOM en JavaScript?',
            answers: ['Data Object Model', 'Document Object Model', 'Display Object Management', 'Digital Object Management'],
            correct: 'Document Object Model'
        },
        {
            question: '¿Cuál es la diferencia principal entre las etiquetas <div> y <span> en HTML?',
            answers: ['<div> es un contenedor en bloque, <span> es un contenedor en línea', '<div> es para contenido en línea, <span> es para contenido en bloque', '<div> es para imágenes, <span> es para texto', 'No hay diferencia'],
            correct: '<div> es un contenedor en bloque, <span> es un contenedor en línea'
        },
        {
            question: '¿Cuál es el propósito del atributo "class" en HTML?',
            answers: ['Definir una clase CSS para aplicar estilos', 'Identificar un elemento único en la página', 'Crear un enlace', 'Ninguna de las anteriores'],
            correct: 'Definir una clase CSS para aplicar estilos'
        },
        {
            question: '¿Qué método de JavaScript se usa para seleccionar un elemento por su ID?',
            answers: ['getElementById', 'querySelector', 'getElementByClass', 'getElementByName'],
            correct: 'getElementById'
        },
        {
            question: '¿Qué es un servidor web?',
            answers: ['Una aplicación que sirve contenido web a los usuarios', 'Un dispositivo para almacenar datos', 'Una aplicación para crear sitios web', 'Un programa para diseñar páginas web'],
            correct: 'Una aplicación que sirve contenido web a los usuarios'
        },
        {
            question: '¿Cuál es la diferencia principal entre HTTP y HTTPS?',
            answers: ['HTTPS es seguro, HTTP no', 'HTTP es más rápido', 'HTTPS es un protocolo más antiguo', 'No hay diferencia'],
            correct: 'HTTPS es seguro, HTTP no'
        },
        {
            question: '¿Qué es JSON?',
            answers: ['JavaScript Object Notation', 'JavaScript Online Notation', 'Java Source Object Notation', 'JavaScript Object Network'],
            correct: 'JavaScript Object Notation'
        },
        {
            question: '¿Cuál es el propósito de Node.js?',
            answers: ['Permitir la ejecución de JavaScript en el lado del servidor', 'Crear bases de datos', 'Estilizar páginas web', 'Ninguna de las anteriores'],
            correct: 'Permitir la ejecución de JavaScript en el lado del servidor'
        },
        {
            question: '¿Qué es un CDN?',
            answers: ['Content Delivery Network', 'Central Data Network', 'Content Data Network', 'Central Delivery Network'],
            correct: 'Content Delivery Network'
        },
        {
            question: '¿Cuál es el propósito de la etiqueta <link> en HTML?',
            answers: ['Enlazar archivos CSS externos', 'Crear enlaces internos', 'Enlazar archivos JavaScript externos', 'Crear enlaces de imágenes'],
            correct: 'Enlazar archivos CSS externos'
        },
        {
            question: '¿Qué es un archivo CSS?',
            answers: ['Un archivo de hoja de estilos en cascada', 'Un archivo de configuración de servidor', 'Un archivo de script', 'Un archivo de datos'],
            correct: 'Un archivo de hoja de estilos en cascada'
        },
        {
            question: '¿Cuál es el propósito de la etiqueta <meta> en HTML?',
            answers: ['Proveer metadatos sobre el documento', 'Crear una nueva sección', 'Enlazar archivos externos', 'Aplicar estilos'],
            correct: 'Proveer metadatos sobre el documento'
        },
        {
            question: '¿Qué es una API REST?',
            answers: ['Una interfaz que usa HTTP para obtener datos', 'Una herramienta para diseño web', 'Un lenguaje de programación', 'Un framework de desarrollo web'],
            correct: 'Una interfaz que usa HTTP para obtener datos'
        },
        {
            question: '¿Cuál es el propósito del atributo "href" en la etiqueta <a>?',
            answers: ['Especificar la URL del enlace', 'Especificar el destino del enlace', 'Establecer el texto del enlace', 'Aplicar estilos al enlace'],
            correct: 'Especificar la URL del enlace'
        },
        {
            question: '¿Qué es AJAX?',
            answers: ['Asynchronous JavaScript and XML', 'Advanced JavaScript and XML', 'Asynchronous Java and XML', 'Application JavaScript and XML'],
            correct: 'Asynchronous JavaScript and XML'
        },
        {
            question: '¿Cuál es el propósito del elemento <header> en HTML5?',
            answers: ['Definir la cabecera de un documento o sección', 'Crear un enlace a otra página', 'Establecer un pie de página', 'Proveer un espacio para imágenes'],
            correct: 'Definir la cabecera de un documento o sección'
        },
        {
            question: '¿Qué significa SEO?',
            answers: ['Search Engine Optimization', 'Search Engine Organization', 'Search Enhancement Optimization', 'Search Engine Operation'],
            correct: 'Search Engine Optimization'
        },
        {
            question: '¿Qué es una cookie en el contexto de la web?',
            answers: ['Un pequeño archivo almacenado en el navegador para guardar información de usuario', 'Un archivo de estilo', 'Un archivo de script', 'Un archivo de datos'],
            correct: 'Un pequeño archivo almacenado en el navegador para guardar información de usuario'
        },
        {
            question: '¿Qué es Git?',
            answers: ['Un sistema de control de versiones', 'Un editor de texto', 'Un lenguaje de programación', 'Una biblioteca de funciones'],
            correct: 'Un sistema de control de versiones'
        },
        {
            question: '¿Qué es un ORM en el contexto de las bases de datos?',
            answers: ['Object-Relational Mapping', 'Operational Relational Mapping', 'Object-Resource Management', 'Operational Resource Management'],
            correct: 'Object-Relational Mapping'
        }
    ];

    function getRandomQuestions(num) {
        const shuffled = questions.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
    }

    startButton.addEventListener('click', () => {
        console.log('Start button clicked');
        startScreen.classList.add('hidden');
        rulesScreen.classList.remove('hidden');
    });

    exitRulesButton.addEventListener('click', () => {
        console.log('Exit rules button clicked');
        rulesScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    });

    continueButton.addEventListener('click', () => {
        console.log('Continue button clicked');
        startExam();
    });

    nextButton.addEventListener('click', () => {
        console.log('Next button clicked');
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion();
        } else {
            endExam();
        }
    });

    retryButton.addEventListener('click', () => {
        console.log('Retry button clicked');
        resetExam();
    });

    exitButton.addEventListener('click', () => {
        console.log('Exit button clicked');
        window.close();
    });

    function startExam() {
        console.log('Starting exam...');
        rulesScreen.classList.add('hidden');
        examScreen.classList.remove('hidden');
        selectedQuestions = getRandomQuestions(10);
        currentQuestionIndex = 0;
        score = 0;
        console.log('Questions selected:', selectedQuestions);
        showQuestion();
        startTimer();
    }

    function showQuestion() {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
        answersElement.innerHTML = '';
        currentQuestion.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('btn');
            button.addEventListener('click', () => selectAnswer(button, answer));
            answersElement.appendChild(button);
        });
        nextButton.classList.add('hidden');
        
        stopTimer(); // Detener cualquier temporizador existente
        startTimer(15); // Iniciar el temporizador con 15 segundos
    }
    
    

    function selectAnswer(button, answer) {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            score++;
            button.classList.add('correct');
            button.innerHTML += ' ✔';
        } else {
            button.classList.add('incorrect');
            button.innerHTML += ' ✖';
            [...answersElement.children].forEach(btn => {
                if (btn.textContent === currentQuestion.correct) {
                    btn.classList.add('correct');
                    btn.innerHTML += ' ✔';
                }
            });
        }
    
        [...answersElement.children].forEach(btn => {
            btn.disabled = true;
        });
    
        nextButton.classList.remove('hidden');
        stopTimer();
    }
    

    function startTimer(seconds) {
        timeLeft = seconds; // Inicializar correctamente
        const endTime = Date.now() + seconds * 1000;
        updateTimerDisplay();
    
        timer = setInterval(() => {
            timeLeft = Math.round((endTime - Date.now()) / 1000);
            if (timeLeft <= 0) {
                clearInterval(timer);
                timeLeft = 0;
                updateTimerDisplay();
                markQuestionUnanswered();
            } else {
                updateTimerDisplay();
            }
        }, 1000); // Actualizar cada segundo
    }
    
    function updateTimerDisplay() {
        timerElement.textContent = timeLeft.toString(); // Asegúrate de convertir a cadena
    }
    
    
    

    function stopTimer() {
        clearInterval(timer);
        timer = null; // Reiniciar el temporizador
    }
    
    

    function markQuestionUnanswered() {
        const currentQuestion = selectedQuestions[currentQuestionIndex];
        [...answersElement.children].forEach(btn => {
            btn.disabled = true;
            if (btn.textContent === currentQuestion.correct) {
                btn.classList.add('correct');
                btn.innerHTML += ' ✔';
            }
        });
        nextButton.classList.remove('hidden');
    }
    
    

    function endExam() {
        examScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
    
        let message;
        let imgSrc;
    
        if (score >= 8) {
            message = `🎉 Felicitaciones, conseguiste ${score} de 10`;
            imgSrc = 'img/felicidades.png'; // Ruta de la imagen para puntaje alto
        } else if (score >= 5) {
            message = `😊 Que bien, conseguiste ${score} de 10`;
            imgSrc = 'img/bien.png'; // Ruta de la imagen para puntaje medio
        } else if (score >= 1) {
            message = `📚 Hay que estudiar, conseguiste ${score} de 10`;
            imgSrc = 'img/estudiar.png'; // Ruta de la imagen para puntaje bajo
        } else {
            message = `😞 Lo siento, conseguiste ${score} de 10`;
            imgSrc = 'img/lo-siento.png'; // Ruta de la imagen para puntaje muy bajo
        }
    
        resultMessageElement.innerHTML = `${message}<br><img src=`;
    }

    
    

    function resetExam() {
        score = 0;
        currentQuestionIndex = 0;
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
});
