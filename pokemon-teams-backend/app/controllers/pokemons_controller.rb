class PokemonsController < ApplicationController

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon.to_json
    end

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon.to_json
    end 

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy

    end

end
