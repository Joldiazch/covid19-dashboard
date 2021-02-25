import graphene
from graphene_django.types import DjangoObjectType, ObjectType
from graphene.types import generic
from django.contrib.auth import get_user_model

from . import last_week_total
from . import last_country_data

class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()

class dailyReportType(graphene.ObjectType):
    date = graphene.String(required=True)
    deaths = graphene.Int(required=True)

class countryReportType(graphene.ObjectType):
    confirmed = graphene.String(required=True)
    recovered = graphene.String(required=True)
    critical = graphene.String(required=True)
    deaths = graphene.String(required=True)

class Query(ObjectType):
    me = graphene.Field(UserType)

    # Last Week total report
    last_week_total = graphene.List(dailyReportType)

    # last week by country
    last_country_data = graphene.Field(countryReportType, country=graphene.String())

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise Exception('Not logged in!')

        return user

    def resolve_last_week_total(self, info):
        #return [{"date": "19/02", "confirmed": 1200}, {"date": "20/02", "confirmed": 1531}, {"date": "21/02", "confirmed": 1784}, {"date": "22/02", "confirmed": 2655}]
        return last_week_total.report()

    def resolve_last_country_data(self, info, **kwargs):
        country = kwargs.get('country')
        return last_country_data.report(country)

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)

    class Arguments:
        email = graphene.String(required=True)
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        password = graphene.String(required=True)

    def mutate(self, info, email, password, first_name, last_name):
        user = get_user_model()(
            username=email,
            email=email,
            first_name=first_name,
            last_name=last_name
        )
        user.set_password(password)
        user.save()

        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
