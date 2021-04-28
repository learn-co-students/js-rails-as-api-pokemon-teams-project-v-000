class PokemonsController < ApplicationController

  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    pokemon = trainer.pokemons.build({
      nickname: Faker::Name.first_name,
      species: Faker::Games::Pokemon.name
    })

    # 501 Not Implemented - would sending this kind of server error be an alternative to json?
    render json: pokemon.save ? pokemon : pokemon.errors.messages

  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    render json: pokemon.destroy ? pokemon : {error: "Could not delete Pokemon"}
  end
end