class PokemonsController < ApplicationController

    def index
        @pokemons ||= Pokemon.all
        render json: @pokemons
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon     
    end

    def create
        user ||= Trainer.find(params[:formData][:trainer_id])
        pokemon = user.pokemons.create
        render json:pokemon
    end
    
    
end
