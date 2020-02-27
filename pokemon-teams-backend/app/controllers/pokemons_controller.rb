class PokemonsController < ApplicationController


    def create 
        trainer ||= Trainer.find(params[:data][:trainer_id])
    Pokemon.transaction do
        pokemon = trainer.pokemons.create
        if pokemon.valid?
            render json:pokemon 
        else
            messages = pokemon.errors.full_messages
            render json: messages, status: 409 
            raise ActiveRecord::Rollback, "Call tech support!"
        end
      end
    end
    
    def destroy
        pokemon = Pokemon.find(params[:data][:pokemon_id])
        pokemon.destroy
        if pokemon.destroyed?
            render json: pokemon, status: 200
        end
    end
    
    
end

