from rest_framework import serializers
from betUniversity.models import Users, Event, Bet

class UsersSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only="True")
    first_name = serializers.CharField(max_length=250)
    last_name = serializers.CharField(max_length=250)
    email = serializers.EmailField(max_length=250)
    bu_amount = serializers.IntegerField()
    event = serializers.PrimaryKeyRelatedField(many=True, read_only=True) # I dont know if these shoudld be read only or not, it gives an error if nothing is there though
    amount = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    def create(self, validated_data):

        return Users.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.bu_amount = validated_data.get('bu_amount', instance.bu_amount)
        instance.event = validated_data.get('event', instance.event)
        instance.amount = validated_data.get('amount', instance.amount)
        instance.save()
        return instance
        
class EventSerializer(serializers.Serializer):
    event_name = serializers.CharField(max_length = 250)
    event_deadline = serializers.DateTimeField()
    over_title = serializers.CharField(max_length=30) # The title of the over bet (e.g. win, yes, over)
    under_title = serializers.CharField(max_length=30) # The title of the under bet (e.g. loss, no, under)
    over_acc = serializers.IntegerField() # The amount of people placing bets on over
    under_acc = serializers.IntegerField() # amount of people placing bets on under

    def create(self, validated_data):

        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.event_name = validated_data.get('event_name', instance.first_name)
        instance.event_deadline = validated_data.get('event_deadline', instance.event_deadline)
        instance.over_title = validated_data.get('over_title', instance.over_title)
        instance.under_title = validated_data.get('under_title', instance.under_title)
        instance.over_acc = validated_data.get('over_acc', instance.over_acc)
        instance.under_acc = validated_data.get('under_acc', instance.under_acc)
        instance.save()
        return instance

class BetSerializer(serializers.Serializer):
    amount = serializers.IntegerField()
    bet = serializers.BooleanField()

    def create(self, validated_data):

        return Bet.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.amount = validated_data.get('amount', instance.amount)
        instance.bet = validated_data.get('bet', instance.bet)
        instance.save()
        return instance
 
class LoginSerializer(serializers.Serializer):
    user_email = serializers.EmailField()
    password = serializers.CharField()