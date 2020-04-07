class TrainersController < ApplicationController

  def index
    trainers = Trainer.all
    # render json: trainers.to_json(:include => {
    #   :pokemons => {:only => [:id, :nickname, :species, :trainer_id]}
    # },:except => [:created_at, :updated_at])
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end


  def create
    trainer = Trainer.find_by(id: params[:trainer_id])
    newPokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
    render json: TrainerSerializer.new(trainer).to_serialized_json
    #render json: newPokemon
    # if you go trainer.save, you will create a Pokemon backend but, but you also get this error -> Uncaught (in promise) SyntaxError: Unexpected end of JSON input at index.js:70 because you are not JSONizing it

  end



end
