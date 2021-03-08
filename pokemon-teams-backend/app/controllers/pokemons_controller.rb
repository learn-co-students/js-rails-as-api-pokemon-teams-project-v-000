class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.new_from_fetch
        pokemon.trainer = trainer
        pokemon.save
        render json: pokemon.to_json
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        message = pokemon.destroy_message
        pokemon.destroy
        render json: message.to_json
    end


end
