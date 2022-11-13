___
___
# Elearning Web Page Modelling
___
___

### Índice

1. **Información de la APP**
    1.1 **Workload**
    1.2 **Sitemap**
    1.3 **Explicación del Modelado**
2. **Patrones**

___

## 1. Información de la APP

### 1.1 Workload

Para la página consideramos la siguiente información:
- Hay **una página principal** que debe mostrar los ultimos 5 videos publicados de cada categoría (Front End, Backend, Devops).
- La página en la que se muestra el detalle de **un curso** se va a **visualizar a menudo.**
- La página en la que se va a visualizar **un video** de un curso se va a **visualizar a menudo.**
- La **página de autor** se espera **que no se consuma tan a menudo** (el usuario suele estar más centrado en ver los videos y de cuando en cuando si le pica la curiosidad le pinchará a un autor).

Para esta página web, se han considerado los **siguientes datos volumétricos**:
- **Categorias**: **inicialmente habrá 4** (Front End, Devops, Bachend y otros) aunque en un futuro podría ampliarse (Desarrollo Móvil, IA, Blockchain...).
- **Cursos**: **inicialmente 10**, se espera que alcancen 100 en un año y un máximo de 1000 en cinco años. Importante preparar la base de datos para ello.
- **Vídeos por curso**: **entre 1 y 20 máximo**.
- Ficha de curso:
    1. Lo que es **el texto que describe la ficha del curso estará almacenado como recursos externo a la Base De Datos**, Mongo sólo almacenara un GUID que identifique a ese contenido.
    2. **Los videos en si se almacenan en una CDN** la base de datos sólo neceista saber el GUID del video o URL.
- Escrituras:
    1. Se espera que **no se suba más de uno o dos cursos / video al día**.
    2. Se espera que **un autor se cree como mucho una vez al día**.
- Lectura
    1. Se espera una **carga fuerte de lectura en página principal, lecciones y video**.

### 1.2 Sitemap

- **Home**: esta muestra un breve resumen de cursos divididos por categorías con los propios enlaces a ellos.
    - **Curso**: aquí se mostrará la información del curso seleccionado junto con el enlace a los diferentes episodios.
        - **Lección**: en esta página veremos el video junto con la explicación escrita.
        - **Autor**: se mostrará una descripción de la persona junto con los cursos en los que participó.

### 1.3 Explicación del Modelado

- **Home**
    - A parte del **título y la descripción**, se añade el campo **"imageURL"**, dónde añadiremos el GUID de la imagen que se use en la portada.
    - Después tenemos **un array de cursos**: se almacena **temática** y los **5 cursos que se quieran destacar**.
- **Courses**
    - Cada curso tiene **título, descripción, un array de autores** (de tipo ObjectId), **un "int" con la suma de las visitas** de todos los videos del curso.
    - Además **mostramos los videos que pertenezcan a este curso**, pero, solo almacenando: nombre, descripción y el _id del video, que se guarda en otra parte.
    - También tiene **un campo** que usamos para el "Tree Pattern" **llamado "tree"** que contiene: **tema del curso, padres e hijos**.
- **Lessons**
    - Incluye: **nombre, descripción, autor** (de tipo ObectId), **GUID del video, GUID del artículo, visitas** (de tipo int) **y tema del vídeo**.
    - Además se incluye un campo llamado **"access"** que es un Array en el que se aplica el "Attribute Pattern". Este campo gestionará dos cosas por el momento:
        - Si creamos la **"key": "free" y lo ponemos a "true", este video será accesible por todo el mundo**. De lo contrario el usuario tendrá que estar suscrito o tendrá que comprar el curso. En caso de no existir esta entrada, se considerará que está a false.
        - Si creamos la **"key": "public" y lo ponemos a "true", este video será visible por todos los usuarios que tengan acceso al video**. De lo contrario tan solo los administradores podrán visualizarlos. En caso de no existir esta entrada, se considerará que está a false.
- **TagCloud**
    - Esto **almacenará todos los tags de cada video** Lo asociamos al mismo a través del _id.
- **Authors**
    - Tiene **nombre, descripción, un array de contacto** (aplicando "Attribute Pattern")** y enlace a los diferentes cursos**. Copiamos los datos del curso y hacemos referencia a este a través del _id ya que esto será cambiado muy pocas veces, únicamente si ha cometido un error al introducir los datos.
- **Users**
    - Cada usuario tendrá: **nombre, usuario, email y contraseña, como información básica**.
    - **En caso de no estar suscritos, para cuyo campo usaremos "suscribed"** (que es un "bool").
    - **Almacenaremos el _id de cada curso en el array** (de tipo ObjectId) **"courseAccess"**. De esta manera sabremos a que cursos tiene acceso cada usuario.
    - Para saber **que videos ha reproducido**, usamos **el campo "playedVideo"** que es un array que contiene:
        - **"course"**, que es el **_id del curso** (de tipo ObjectId).
        - **"played"**, que es un **array de "bools"**, donde **cada posición es un video**, en orden ascendente. De esta manera sabremos que videos se han reproducido por la posición en la que haya un "true". 

Además todas las colecciones tienen el "Scheme Version" llamado "schVer", y, para aquellas en las que se vayan a almacenar muchos datos, el "hasOverflow".

___

## 2. Patrones

Para este modelado se han usado los siguientes patrones:
- **Subset Pattern**
    - **Los tags de un video** puede llegar a tener decenas de strings y, como no es algo que se modifique habitualmente, se ha separado de los vídeos, siendo el _id del video lo que los relaciona. 
    - En la página de cada curso no es necesario acceder a toda la información de cada video, tan solo al título y descripción. Es por ello que **se han separado todos los videos** y los relacionamos con el curso a través del _id. De esta manera la página del curso carga más rápida, aun que duplicamos datos, por supuesto.
- **Computed Pattern**
    - **Las visualizaciones de los vídeos** se cargarán cada cierto tiempo, no es necesario que la información se actualice al segundo.
- **Attribute Pattern**
    - Usamos este patrón para los **diferentes contactos de los autores**. De esta manera podemos individualizarlos, existiendo autores que puedan tener "Instagram" y otros no, por ejemplo.
- **Schema Versioning Pattern**
    - **Durante el desarrollo de un proyecto, como en su vida serie, hay colecciones que podrían cambiar**, es por ello que se añade el parámetro "schVer". De esta manera podremos migrar el proyecto sin detener la aplicación (usando "Batch Update", por ejemplo).
- **Tree Pattern**
    - **Se aplica a los cursos** para poder buscar por áreas del conocimiento más específicas.
- **Outlier Pattern**
    - Sabemos que en 5 años los cursos podrían aumentar a 1000, es por ello que preparamos una variable por si superásemos la información máxima que podemos almacenar.
