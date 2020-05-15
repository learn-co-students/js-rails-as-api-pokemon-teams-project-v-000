class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            pokemon = trainer.pokemons.build({
                nickname: Faker::Name.first_name,
                species: Faker::Games::Pokemon.name
            })
            if pokemon.save
                render json: pokemon
            end
        else
            msg = { :error => "No more than 6 Pokemon per team!"}
            render json: msg
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end
end
