class PokemonsController < ApplicationController

    def create
        if Trainer.find_by(id: params[:trainer_id]).pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
            render json: pokemon
        else
          # capture this in front-end to handle
            render json: { message: "Team is full" }
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: {}
    end
end
