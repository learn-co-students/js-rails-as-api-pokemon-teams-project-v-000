class PokemonsController < ApplicationController
    def destroy
        poke = Pokemon.find_by(id: params[:id])
        poke.destroy       
    end 

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        newPokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: newPokemon
    end 
end
