class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        options = {
            include: [:trainer]
        }
        render json: pokemon
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
    end

    def destroy

    end

end
