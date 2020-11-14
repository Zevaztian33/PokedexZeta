$(document).ready(function () {
    //Loader inicial
     var contenedor = document.getElementById('contenedor_carga');

    //Oculta el contenedor
    function hideContainer(){
        contenedor.style.visibility = 'hidden';
        contenedor.style. opacity = '0';
    }
    //Muestra el contenedor
    function showContainer(){
        contenedor.style.visibility = 'visible';
        contenedor.style. opacity = '1';
    }
    // Primera llamada al cargar la página
    hideContainer();

    $.ajax({
        type: "GET",
        url: `https://pokeapi.co/api/v2/pokemon/1`,
        dataType: "json",
        success: function (response) {
            //Datos de la ficha pokemon
            let infoPoke = response;
            $('#imagen').html(`
            <img src=" ${infoPoke.sprites.front_default} " alt=" ${infoPoke.id} ">`);
            $('#nombre').html(`Nombre: ${infoPoke.name}`);
            $('#numero').html(`N° Pokédex: ${infoPoke.id}`);
            $('#peso').html(`Peso: ${infoPoke.weight/10} kls.`);
            $('#altura').html(`Altura: ${infoPoke.height/10} mts.`);

            //Formula para buscar el Tipo
            $('#tipo').html("");
            infoPoke.types.forEach((tipo,index) => {
                $('#tipo').append(` ${tipo.type.name}`);
            });

            //Variantes de la imagen
            $("#normal").click(function() {
                $("#imagen").html(`
                <img src=" ${infoPoke.sprites.front_default} " alt=" ${infoPoke.id} ">`);
            });

            $("#back").click(function() {
                $("#imagen").html(`
                <img src=" ${infoPoke.sprites.back_default} " alt=" ${infoPoke.id} ">`);
            });
            
            $("#shiny").click(function() {
                $("#imagen").html(`
                <img src=" ${infoPoke.sprites.front_shiny} " alt=" ${infoPoke.id} ">`);
            });

            $("#backshiny").click(function() {
                $("#imagen").html(`
                <img src=" ${infoPoke.sprites.back_shiny} " alt=" ${infoPoke.id} ">`);
            });
            
            $("#oficial").click(function() {
                $("#imagen").html(`
                <img src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${infoPoke.id}.png" alt="${infoPoke.id}" />`);
            });

            $("#sprite").click(function() {
                $("#imagen").html(`
                <img src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${infoPoke.id}.gif" alt="${infoPoke.id}" />`);
            });

            //Formula para mostrar habilidades
            hp = infoPoke.stats[0].base_stat,
            atk = infoPoke.stats[1].base_stat,
            def = infoPoke.stats[2].base_stat,
            spAtk = infoPoke.stats[3].base_stat
            spDef = infoPoke.stats[4].base_stat,
            speed = infoPoke.stats[5].base_stat,

            $(".hp").html(hp);
            $(".attack").html(atk);
            $(".defense").html(def);
            $(".special-attack").html(spAtk);
            $(".special-defense").html(spDef);
            $(".speed").html(speed);

            //Formula para mostrar habilidades 
            let skills = infoPoke.abilities;
            if (skills.length > 0) {
                skills.forEach((habilidades) => {
                    $('#nameSkills > ol').append(`<li>${habilidades.ability.name}</li>`)
                });
            } else {
                $('#nameSkills > ol').append(`NO TIENE HABILIDADES INGRESADAS AUN`)
            }

            //Formula para mostrar Held Items
            let heldItems = infoPoke.held_items;
            if (heldItems.length > 0) {
                heldItems.forEach((items) => {
                    $('#nameItems > ol').append(`<li>${items.item.name}</li>`)
                });
            } else {
                $('#nameItems > ol').append(`NO TIENE HELD ITEM`)
            }

            //Formula para cambiar el color de fondo dependiendo del Tipo
            let types = [];
            for (let i = 0; i < infoPoke.types.length; i++) {
                let type = infoPoke.types[i].type.name;
                types.push(type);
            };

            function pokemonType(types) {
                $("#tipo").html("");
                for (let i = 0; i < types.length; i++) {
                    $("#tipo").append("<div class='pokeType poke-info " + types[i] + "'>" + types[i] + " </div>");
                }
            };

            //Llamada a la funcion
            pokemonType(types);

            //Grafico CANVAS
            var grafico = {
               
                theme: "dark2",
                
                title: {
                    text: `Stats Base de ${response.name.toUpperCase()}`,
                    fontFamily: 'Righteous',     
                },
                animationEnabled: true,
                data: [              
                {
                    type: "column",
                    color: "#fbcb04",
                    dataPoints: [
                        { label: "HP",  y: (hp) },
                        { label: "Attack", y: (atk) },
                        { label: "Defense", y: (def) },
                        { label: "Special-Attack",  y: (spAtk) },
                        { label: "Special-Defense",  y: (spDef) },
                        { label: "Speed",  y: (speed) }
                    ]
                }
                ]
            };
            
            $("#chartContainer").CanvasJSChart(grafico);
        },
    });

// --------------------------SECCION DE BUSQUEDA DE UN NUEVO POKEMON--------------------------------

    // $('#buscando').on('click',(e)=>{
        
    // });

    let buscarpokemon = (e) =>{ 

        e.preventDefault();
        let entrada = $('input').val().toLowerCase();
        $.ajax({

            // Acción ejecutada antes de iniciar el AJAX
            beforeSend: () => {
                showContainer();
            },
            // Acción ejecutada al finalizar el AJAX, tanto si falla como si funciona perfectamente
            complete: () => {
                hideContainer();
            },
            
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${entrada}`,
            dataType: "json",

            success: function (response) {
                //Datos de la ficha pokemon
                let infoPoke = response;
                $('#imagen').html(`
                <img src=" ${infoPoke.sprites.front_default} " alt=" ${infoPoke.id} ">`);
                $('#nombre').html(`Nombre: ${infoPoke.name}`);
                $('#numero').html(`N° Pokédex: ${infoPoke.id}`);
                $('#peso').html(`Peso: ${infoPoke.weight/10} kls.`);
                $('#altura').html(`Altura: ${infoPoke.height/10} mts.`);

                //Formula para buscar el Tipo
                $('#tipo').html("");
                infoPoke.types.forEach((tipo,index) => {
                    $('#tipo').append(` ${tipo.type.name} `);
                });         
                
                //Variantes de la imagen
                $("#normal").click(function() {
                    $("#imagen").html(`
                    <img src=" ${infoPoke.sprites.front_default} " alt=" ${infoPoke.id} ">`);
                });
    
                $("#back").click(function() {
                    $("#imagen").html(`
                    <img src=" ${infoPoke.sprites.back_default} " alt=" ${infoPoke.id} ">`);
                });
                
                $("#shiny").click(function() {
                    $("#imagen").html(`
                    <img src=" ${infoPoke.sprites.front_shiny} " alt=" ${infoPoke.id} ">`);
                });
    
                $("#backshiny").click(function() {
                    $("#imagen").html(`
                    <img src=" ${infoPoke.sprites.back_shiny} " alt=" ${infoPoke.id} ">`);
                });

                $("#oficial").click(function() {
                    $("#imagen").html(`
                    <img src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${infoPoke.id}.png" alt="${infoPoke.id}" />`);
                });
    
                $("#sprite").click(function() {
                    $("#imagen").html(`
                    <img src=" https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${infoPoke.id}.gif" alt="${infoPoke.id}" />`);
                });
                
                //Formula para mostrar habilidades
                hp = infoPoke.stats[0].base_stat,
                atk = infoPoke.stats[1].base_stat,
                def = infoPoke.stats[2].base_stat,
                spAtk = infoPoke.stats[3].base_stat,
                spDef = infoPoke.stats[4].base_stat,
                speed = infoPoke.stats[5].base_stat,

                $(".hp").html(hp);
                $(".attack").html(atk);
                $(".defense").html(def);
                $(".special-attack").html(spAtk);
                $(".special-defense").html(spDef);
                $(".speed").html(speed);

                //Formula para mostrar habilidades
                $("#nameSkills > ol").html("");
                let skills = infoPoke.abilities;
                if (skills.length > 0) {
                    skills.forEach((habilidades) => {
                        $('#nameSkills > ol').append(`<li>${habilidades.ability.name}</li>`)
                    });
                } else {
                    $('#nameSkills > ol').append(`NO TIENE HABILIDADES INGRESADAS AUN`)
                }

                //Formula para mostrar Held Items
                $("#nameItems > ol").html("");
                let heldItems = infoPoke.held_items;
                if (heldItems.length > 0) {
                    heldItems.forEach((items) => {
                        $('#nameItems > ol').append(`<li>${items.item.name}</li>`)
                    });
                } else {
                    $('#nameItems > ol').append(`NO TIENE HELD ITEM`)
                }

                //Formula para cambiar el color de fondo dependiendo del Tipo
                let types = [];
                for (let i = 0; i < infoPoke.types.length; i++) {
                    let type = infoPoke.types[i].type.name;
                    types.push(type);
                };
    
                function pokemonType(types) {
                    $("#tipo").html("");
                    for (let i = 0; i < types.length; i++) {
                        $("#tipo").append("<div class='pokeType poke-info " + types[i] + "'>" + types[i] + " </div>");
                    }
                };

                //Llamada a la funcion
                pokemonType(types);

                //Grafico CANVAS
                var grafico = {
               
                theme: "dark2",
                
                title: {
                    text: `Stats Base de ${response.name.toUpperCase()}`,
                    fontFamily: 'Righteous',     
                },
                animationEnabled: true,
                data: [              
                {
                    type: "column",
                    color: "#fbcb04",
                    dataPoints: [
                        { label: "HP",  y: (hp) },
                        { label: "Attack", y: (atk) },
                        { label: "Defense", y: (def) },
                        { label: "Special-Attack",  y: (spAtk) },
                        { label: "Special-Defense",  y: (spDef) },
                        { label: "Speed",  y: (speed) }
                    ]
                }
                ]
            };
            
            $("#chartContainer").CanvasJSChart(grafico);

            //Comando para borrar lo escrito en el buscador
                $('input').val("");
            },
            
            //Respuesta en caso de error en la busqueda
            error: function(error){
                console.error(error);
                $('#imagen').html(`
                <p>El Nombre o Número: "${entrada}" no existe, intenta nuevamente</p>`);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: '¡El nombre o número no existe!',
                    footer: 'Intentalo nuevamente'
                });
            },
        });
    }
    $('form').on('submit', buscarpokemon);
});