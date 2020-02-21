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
        trainer ||= Trainer.find(params[:data][:trainer_id])
        pokemon = trainer.pokemons.create
        if pokemon.valid?
            render json:pokemon
        else
             messages = pokemon.errors.full_messages
            render :json =>{
                status: 409,
                messages: messages
            }
        end
    end
    
    
end
