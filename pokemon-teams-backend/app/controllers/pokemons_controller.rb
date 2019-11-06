class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        if Trainer.find_by_id(params[:trainer_id]).pokemons.count < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
            render json: pokemon
        else
            render json: { error: "Team Full" }
        end
    end

    def destroy
        pokemon = Pokemon.find_by_id(params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
