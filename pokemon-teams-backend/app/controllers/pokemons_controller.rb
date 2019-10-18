class PokemonsController < ApplicationController

    def new

    end 

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.new
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name
        pokemon.trainer_id = trainer.id
        if pokemon.save
            render json: pokemon
        else 
            render pokemon.errors.full_messages
        end
    end 

    def show 
        pokemon = Pokemon.find(params[:id])
        render json: pokemon
    end 

    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.delete
        render json: pokemon
    end 

private 

    def pokemon_params
        params.require(:trainer).permit(:pokemon => {})
    end 
end
