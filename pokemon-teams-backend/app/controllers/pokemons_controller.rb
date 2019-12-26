require 'faker'
class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: PokemonSerializer.new(pokemons)
      end

    def show
      pokemon = Pokemon.find_by(id: params[:id])
      render json: PokemonSerializer.new(pokemon)
    end

    def create()
      @pokemon = Pokemon.new
      @pokemon.nickname = Faker::Name.first_name
      @pokemon.species = Faker::Games::Pokemon.name
      @pokemon.trainer_id = params[:id]
      @pokemon.save
    end

    def destroy
      pokemon = Pokemon.find_by(id: params[:id])
      pokemon.destroy
    end
  
  end
