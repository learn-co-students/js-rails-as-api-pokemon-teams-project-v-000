require 'pry'
class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        options = {
            include: [:trainer]
        }
        render json: pokemon
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        pokemon = trainer.pokemons.build({
            # db/seeds.rb defined
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })
        #                           If          Else
        render json: pokemon.save ? pokemon : {message: pokemon.errors.mesages[:team_max][0]}
     end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
    end

end
