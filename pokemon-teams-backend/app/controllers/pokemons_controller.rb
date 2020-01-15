class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons).to_serialized_json
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        redirect_to pokemon_path(pokemon)
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: PokemonSerializer.new(pokemon).to_serialized_json
    end
end
