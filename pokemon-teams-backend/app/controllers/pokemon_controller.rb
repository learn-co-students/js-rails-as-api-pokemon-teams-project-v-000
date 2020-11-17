require 'faker'

class PokemonController < ApplicationController
    def show
        pokemon = Pokemon.find(params[:id])
        render json: PokemonSerializer.new(pokemon)
    end

    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
    end

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species)

    end

    def destroy
    end
end
