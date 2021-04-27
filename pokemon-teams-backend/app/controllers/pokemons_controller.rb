class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, except: [:created_at, :updated_at]
    end

    def show
        pokemon = Pokemon.find_by(params[:id])
        render json: pokemon
    end  
end
