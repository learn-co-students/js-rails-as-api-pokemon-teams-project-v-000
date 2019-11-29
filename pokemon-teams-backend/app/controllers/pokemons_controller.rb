class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon.to_json
    end 

end
