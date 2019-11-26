class PokemonsController < ApplicationController
    def create
        id = params[:trainer_id]
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer = Trainer.find_by_id(id)
        if trainer.pokemons.length <= 6
            new_pokemon = Pokemon.create(nickname: name, species: species, trainer_id: id)
            options = {
                include: [:trainer]
            }
            render json: PokemonSerializer.new(new_pokemon, options)
        else
            render json: {message: 'You can only have 6 pokemon at a time.'}
        end
    end

    def destroy
        Pokemon.find_by_id(params[:id]).destroy
        render json: {message: 'Released'}
    end
end
