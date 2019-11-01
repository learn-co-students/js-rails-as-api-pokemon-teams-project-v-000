class PokemonsController < ApplicationController

    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:id, :species, :nickname, :trainer_id]
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, only: [:id, :species, :nickname, :trainer_id]
    end
end
