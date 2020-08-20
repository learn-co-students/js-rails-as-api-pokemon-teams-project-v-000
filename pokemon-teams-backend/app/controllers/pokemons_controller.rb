class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon
    end

    def destroy
        Pokemon.destroy(params[:id])
    end
end
