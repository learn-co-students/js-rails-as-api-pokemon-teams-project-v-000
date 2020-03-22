class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name
  has_many :pokemons

  def initialize(obj)
    @obj = obj 
  end

  def make_json
    @obj.to_json(
      :include => {
        :pokemons => {:only => [:id, :nickname, :species]}
      })
  end
end
