class PokemonsController < ApplicationController

    def create
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemons = trainer.pokemons
        if pokemons.length < 6
            name = Faker::Name.first_name
            species = Faker::Games::Pokemon.name
            pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
            render json: pokemon
        else
            render json: {message: 'Pokemon team full'}
        end
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
        pokemon.destroy
    end


end
