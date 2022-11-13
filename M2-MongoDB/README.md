
### Second Module of LemonCode BackEnd Bootcamp 

# Basico
## Restaurar backup
Vamos a restaurar el set de datos de mongo atlas airbnb.

Lo puedes encontrar en este enlace: https://drive.google.com/drive/folders/1gAtZZdrBKiKioJSZwnShXskaKk6H_gCJ?usp=sharing

Para restaurarlo puede seguir las instrucciones de este videopost: https://www.lemoncode.tv/curso/docker-y-mongodb/leccion/restaurando-backup-mongodb

> Acuérdate de mirar si en opt/app hay contenido de backups previos que tengas que borrar

## General
En este base de datos puedes encontrar un montón de apartamentos y sus reviews, esto está sacado de hacer webscrapping.

**Pregunta**: Si montaras un sitio real, ¿qué posibles problemas pontenciales le ves a cómo está almacenada la información?

`El primer problema, para mi, es la cantidad de datos que se almacenan en una misma colección, lo cual puede llevar a que, en poco tiempo, pese demasiado. El siguiente es que todas las entradas son demasiado claras: "name", "summary", etc. esto permite que adquirir los datos sea sencillo, pudiendo hacer ingeniería inversa.`

## Consultas

### Basico

- Saca en una consulta cuántos apartamentos hay en España.

`db.listingsAndReviews.find({room_type: "Entire home/apt", "address.country": "Spain"});`

- Lista los 10 primeros:
    - Sólo muestra: nombre, camas, precio, government_area
    - Ordenados por precio.

`db.listingsAndReviews.aggregate(
    {
        $match: {
            room_type: "Entire home/apt", 
            "address.country": "Spain"
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            beds: 1,
            price: 1,
            "address.government_area": 1
        }
    },
    {
        $sort: {price: 1}
    },
    {
        $limit: 10
    }
);`

### Filtrando

- Queremos viajar cómodos, somos 4 personas y queremos:
    - 4 camas.
    - Dos cuartos de baño.

`db.listingsAndReviews.find(
    {
        beds: {$eq: 4},
        bathrooms: {$eq: 2}
    }
);`

- Al requisito anterior, hay que añadir que nos gusta la tecnología queremos que el apartamento tenga wifi.

`db.listingsAndReviews.find(
    {
        beds: {$eq: 4},
        bathrooms: {$eq: 2},
        amenities: "Wifi"
    }
);`

- Y bueno, un amigo se ha unido que trae un perro, así que a la query anterior tenemos que buscar que permitan mascota Pets Allowed.

`db.listingsAndReviews.find(
    {
          beds: {$eq: 4},
          bathrooms: {$eq: 2},
          amenities: {$all: ["Wifi", "Pets allowed"]}
    }
);`

### Operadores lógicos

- Estamos entre ir a Barcelona o a Portugal, los dos destinos nos valen, peeero... queremos que el precio nos salga baratito (50 $), y que tenga buen rating de reviews.

`db.listingsAndReviews.aggregate(
    {
        $match: {
            $or: [
                {"address.market": "Barcelona"},
                {"address.country": "Portugal"}
            ],
            price: {$lte: 50},
            "review_scores.review_scores_rating": {$gte: 70}
        }
    }
);`

## Agregaciones

- Queremos mostrar los pisos que hay en España, y los siguiente campos:
    - Nombre.
    - De que ciudad (no queremos mostrar un objeto, solo el string con la ciudad)
    - El precio

`db.listingsAndReviews.aggregate(
    {
        $match: {
            "address.country": "Spain",
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            city: {$toString: "$address.market"},
            price: {$toInt: "$price"}
        }
    }
);`

- Queremos saber cuántos alojamientos hay disponibles por país.

`db.listingsAndReviews.aggregate(
    {
        $group : {
            _id: "$address.country",
            suma: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 1,
            suma: 1
        }
    }
);`

# Opcional

- Queremos saber el precio medio de alquiler de airbnb en España.

`db.listingsAndReviews.aggregate(
    {
        $match: {
            "address.country": "Spain"
        }
    },
    {
    $group: {
        _id: '$address.country',
        count: {
            $sum: 1
        },
        sum: {
            $sum: {
                $toInt: '$price'
            }
        }
    }
}, {
    $project: {
        _id: 1,
        precioMedio: {
            $divide: [
                '$sum',
                '$count'
            ]
        }
    }
});`

- ¿Y si quisiéramos hacer como el anterior, pero sacarlo por paises?

`use('data');
db.listingsAndReviews.aggregate(
    {
    $group: {
        _id: '$address.country',
        count: {
            $sum: 1
        },
        sum: {
            $sum: {
                $toInt: '$price'
            }
        }
    }
}, {
    $project: {
        _id: 1,
        precioMedio: {
            $divide: [
                '$sum',
                '$count'
            ]
        }
    }
});`

- Repite los mismos pasos pero agrupando también por número de habitaciones.

# Desafio

Queremos mostrar el top 5 de apartamentos más caros en España, y sacar los siguentes campos:

- Nombre.
- Ciudad.
- Amenities, pero en vez de un array, un string con todos los amenities.

`db.listingsAndReviews.aggregate(
    {
        $match: {
            room_type: "Entire home/apt", 
            "address.country": "Spain"
        }
    },
    {
        $project: {
            _id: 0,
            name: 1,
            city: {$toString: "$address.market"},
            price: 1,
            amenities: {
                $reduce: {
                    input: "$amenities",
                    initialValue: "",
                    in: {$concat: ["$$value", "$$this", ", "]}
                }
            }
        }
    },
    {
        $sort: {price: -1}
    },
    {
        $limit: 5
    }
);`