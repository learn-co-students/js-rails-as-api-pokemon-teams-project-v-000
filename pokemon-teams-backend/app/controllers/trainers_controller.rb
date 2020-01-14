class TrainersController < ApplicationController
  def index
    trainers = Trainer.all
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end
  def show
    trainer = Trainer.find_by(id: params[:id])
    render json: TrainerSerializer.new(trainer).to_serialized_json
  end

  def create
     trainer = Trainer.find_by(id: params[:trainer_id])
     newPokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id])
     render json: TrainerSerializer.new(trainer).to_serialized_json
   end

end
