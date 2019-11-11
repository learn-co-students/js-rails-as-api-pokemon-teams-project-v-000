class PokemonsController < ApplicationController
  def create
    pokemon = Pokemon.create_random(params[:trainer_id])
    #trainer = Trainer.find_by(id: trainerid)
    #do I need a render? what does the request return
    render json: PokemonSerializer.new(pokemon).to_serialized_json
  end

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy
    render json: pokemon.to_json
  end
end
