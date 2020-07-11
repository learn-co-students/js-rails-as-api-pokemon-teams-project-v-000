class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find_by(id: params[:trainer_id])

        if(trainer && trainer.pokemons.size<6)
            new_pokemon = trainer.pokemons.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id)

            render json: new_pokemon            
        else
            render json: {message: "Reached max. number of pokemons."}  
        end

    end

end
