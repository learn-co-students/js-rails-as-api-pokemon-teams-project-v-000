class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attribute :name
  has_many :pokemons
end
